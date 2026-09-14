import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ categories }) {
    const destroy = (category) => {
        if (
            confirm(
                `¿Eliminar la categoría "${category.name}" y todos sus productos?`,
            )
        ) {
            router.delete(route("admin.categories.destroy", category.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Categorías
                </h2>
            }
        >
            <Head title="Categorías" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="flex justify-end">
                        <Link
                            href={route("admin.categories.create")}
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-gray-700"
                        >
                            Nueva categoría
                        </Link>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Nombre
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Productos
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Estado
                                    </th>
                                    <th className="px-6 py-3" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {categories.map((category) => (
                                    <tr key={category.id}>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {category.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {category.description}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {category.products_count}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                            <span
                                                className={
                                                    "inline-flex rounded-full px-2 text-xs font-semibold leading-5 " +
                                                    (category.is_active
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800")
                                                }
                                            >
                                                {category.is_active
                                                    ? "Activa"
                                                    : "Oculta"}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium space-x-4">
                                            <Link
                                                href={route(
                                                    "admin.categories.products.index",
                                                    category.id,
                                                )}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Productos
                                            </Link>
                                            <Link
                                                href={route(
                                                    "admin.categories.edit",
                                                    category.id,
                                                )}
                                                className="text-gray-600 hover:text-gray-900"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    destroy(category)
                                                }
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {categories.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-6 py-4 text-center text-sm text-gray-500"
                                        >
                                            No hay categorías todavía.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
