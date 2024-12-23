//nimark-admin/app/api/[storeId]/products/[productId]/route.ts

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { updateProductStock } from "@/lib/productUtils";
import { getOrCreateDefaultBrand } from "@/lib/utils/brand";


export async function GET (
    req: Request,
    { params }: { params: { productId: string }}
) {
    try {
        if(!params.productId) {
            return new NextResponse("Product id is required", { status: 400 });
        }

        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true,
                brand: true,
            }
        });

        return NextResponse.json(product);
    } catch (err) {
        console.log('[PRODUCT_GET]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string, productId: string }}
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const {
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            brandId,
            images,
            isFeatured,
            isArchived,
            stock,
            stockChange,  // New field
            description,
            properties,
            relatedProductIds,
        } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400});
        }

        if (!price) {
            return new NextResponse("Price is required", { status: 400});
        }

        if (!categoryId) {
            return new NextResponse("Category id is required", { status: 400});
        }

        if (!colorId) {
            return new NextResponse("Color id is required", { status: 400});
        }

        if (!sizeId) {
            return new NextResponse("Size id is required", { status: 400});
        }

        if (stock === undefined) {
            return new NextResponse("Stock is required", { status: 400});
        }
        if (stock < 0) {
            return new NextResponse("Stock cannot be negative", { status: 400 });
          }

        if (!images || !images.length) {
            return new NextResponse("Image is required", { status: 400});
        }

        if(!params.productId) {
            return new NextResponse("Product id is required", { status: 400 });
        }

        let finalBrandId = brandId;
        if (!brandId) {
        const defaultBrand = await getOrCreateDefaultBrand(params.storeId);
        finalBrandId = defaultBrand.id;
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        let updatedStock = stock;

        if (stockChange !== undefined) {
            const newStock = await updateProductStock(params.productId, stockChange);
            if (newStock !== null) {
                updatedStock = newStock;
            }
        }

        const isAutoArchived = stock === 0;


        const product = await prismadb.product.update({
            where: {
                id: params.productId
            },
            data: {
                name,
                price,
                isFeatured,
                isArchived: isAutoArchived ? true : isArchived,
                categoryId,
                sizeId,
                brandId: finalBrandId,
                colorId,
                stock: updatedStock,
                description,
                properties: properties ? JSON.parse(JSON.stringify(properties)) : null,
                storeId: params.storeId,
                relatedTo: {
                set: relatedProductIds ? relatedProductIds.map((id: string) => ({ id })) : []
                }
            }
            });

        // Delete existing images
        await prismadb.image.deleteMany({
            where: {
            productId: params.productId
            }
        });

         // Create new images
        await prismadb.image.createMany({
            data: images.map((image: { url: string }) => ({
            productId: params.productId,
            url: image.url
            }))
        });

        return NextResponse.json(product);
    } catch (err) {
        console.log('[PRODUCT_PATCH]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function DELETE (
    req: Request,
    { params }: { params: { storeId: string, productId: string }}
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if(!params.productId) {
            return new NextResponse("Product id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const product = await prismadb.product.deleteMany({
            where: {
                id: params.productId,
            }
        });

        return NextResponse.json(product);
    } catch (err) {
        console.log('[PRODUCT_DELETE]', err);
        return new NextResponse('Internal error', { status: 500 });
    }
}