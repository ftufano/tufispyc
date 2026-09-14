import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ stats }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Panel de administración
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                            <p className="text-sm font-medium text-gray-500">
                                Categorías
                            </p>
                            <p className="mt-1 text-3xl font-bold text-gray-900">
                                {stats.categories}
                            </p>
                        </div>
                        <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                            <p className="text-sm font-medium text-gray-500">
                                Productos
                            </p>
                            <p className="mt-1 text-3xl font-bold text-gray-900">
                                {stats.products}
                            </p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900">
                            Gestiona tu menú
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Crea categorías y agrega productos con nombre,
                            descripción, precio e imagen.
                        </p>
                        <Link
                            href={route("admin.categories.index")}
                            className="mt-4 inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-gray-700"
                        >
                            Ir a categorías
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
