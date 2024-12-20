//@/app/page.tsx

export default function HomePage() {
  return (
    <section className="text-center py-16">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Relationship Matrix</h1>
      <p className="text-lg text-gray-600 mb-8">
        Take insightful tests to explore your relationships and self-reflection times.
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="/tests"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
        >
          Try a Test
        </a>
        <a
          href="/about"
          className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-300"
        >
          Learn More
        </a>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">Popular Tests</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <li className="p-6 border rounded-lg shadow hover:shadow-md">
            <h3 className="text-xl font-bold mb-2">Relationship Health Test</h3>
            <p className="text-gray-600 mb-4">
              Discover how healthy your relationship is.
            </p>
            <a href="/tests/relationship-health" className="text-blue-600 hover:underline">
              Take Test
            </a>
          </li>
          <li className="p-6 border rounded-lg shadow hover:shadow-md">
            <h3 className="text-xl font-bold mb-2">Love Language Quiz</h3>
            <p className="text-gray-600 mb-4">
              Learn your love language and how to express it.
            </p>
            <a href="/tests/love-language" className="text-blue-600 hover:underline">
              Take Test
            </a>
          </li>
          <li className="p-6 border rounded-lg shadow hover:shadow-md">
            <h3 className="text-xl font-bold mb-2">Conflict Resolution Skills</h3>
            <p className="text-gray-600 mb-4">
              Assess how well you handle conflicts.
            </p>
            <a href="/tests/conflict-resolution" className="text-blue-600 hover:underline">
              Take Test
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
