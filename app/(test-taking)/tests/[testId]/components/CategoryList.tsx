//app/(test-taking)/tests/[testId]/components/CategoryList.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Category } from "@/types/tests/category"

interface CategoryListProps {
  categories: Category[]
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="text-lg">{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {category.description && (
                <p className="text-sm text-muted-foreground mb-2">
                  {category.description}
                </p>
              )}
              <p className="text-sm">
                Questions: {category._count?.questions || 0}
              </p>
              <p className="text-sm">
                Scale: {category.scale}
              </p>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}