import { useEffect, useRef, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";

function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
    }).format(Number(price));
}

function ProductCard({ product }) {
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-rose-100 transition hover:shadow-md">
            {product.image_url ? (
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-48 w-full object-cover"
                />
            ) : (
                <div className="flex h-48 w-full items-center justify-center bg-rose-50 text-rose-200">
                    <span className="text-sm">Sin imagen</span>
                </div>
            )}
            <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-lg text-gray-900">
                        {product.name}
                    </h3>
                    <span className="whitespace-nowrap font-semibold text-rose-600">
                        {formatPrice(product.price)}
                    </span>
                </div>
                {product.description && (
                    <p className="text-sm leading-relaxed text-gray-500">
                        {product.description}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function Menu({ categories }) {
    const { auth } = usePage().props;
    const [activeCategory, setActiveCategory] = useState(
        categories[0]?.slug ?? null,
    );
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const categoryNavRef = useRef(null);
    const categoryLinkRefs = useRef({});
    const categoryDragRef = useRef(null);
    const pendingCategoryRef = useRef(null);

    useEffect(() => {
        function updateMenuState() {
            setShowScrollTop(window.scrollY > 200);

            let currentCategory = categories[0]?.slug ?? null;
            const trackingPoint = window.innerHeight / 2;
            const isAtBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 1;
            const pendingCategory = pendingCategoryRef.current;

            if (pendingCategory) {
                const pendingSection = document.getElementById(pendingCategory);
                const pendingSectionTop =
                    pendingSection?.getBoundingClientRect().top;

                if (
                    isAtBottom ||
                    (pendingSectionTop !== undefined &&
                        Math.abs(pendingSectionTop - 96) <= 16)
                ) {
                    pendingCategoryRef.current = null;
                } else {
                    return;
                }
            }

            for (const category of categories) {
                const section = document.getElementById(category.slug);

                if (section?.getBoundingClientRect().top <= trackingPoint) {
                    currentCategory = category.slug;
                } else {
                    break;
                }
            }

            setActiveCategory(
                isAtBottom
                    ? (categories.at(-1)?.slug ?? null)
                    : currentCategory,
            );
        }

        updateMenuState();
        window.addEventListener("scroll", updateMenuState, {
            passive: true,
        });

        return () => window.removeEventListener("scroll", updateMenuState);
    }, [categories]);

    useEffect(() => {
        categoryLinkRefs.current[activeCategory]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    }, [activeCategory, categories]);

    function scrollToCategory(event, slug) {
        event.preventDefault();
        pendingCategoryRef.current = slug;
        setActiveCategory(slug);
        setIsCategoryMenuOpen(false);
        document.getElementById(slug)?.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", `#${slug}`);
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(
            null,
            "",
            `${window.location.pathname}${window.location.search}`,
        );
    }

    function startCategoryDrag(event) {
        const categoryNav = categoryNavRef.current;

        if (!categoryNav) {
            return;
        }

        categoryDragRef.current = {
            clientX: event.clientX,
            pointerId: event.pointerId,
            scrollLeft: categoryNav.scrollLeft,
        };
    }

    function dragCategories(event) {
        const categoryNav = categoryNavRef.current;
        const dragStart = categoryDragRef.current;

        if (
            !categoryNav ||
            !dragStart ||
            dragStart.pointerId !== event.pointerId
        ) {
            return;
        }

        const distance = event.clientX - dragStart.clientX;

        if (Math.abs(distance) > 4) {
            categoryNav.scrollLeft = dragStart.scrollLeft - distance;
        }
    }

    function endCategoryDrag(event) {
        if (categoryDragRef.current?.pointerId === event.pointerId) {
            categoryDragRef.current = null;
        }
    }

    return (
        <>
            <Head title="Tortas • Desayunos • Arreglos de cumpleaños" />

            <div className="min-h-screen bg-rose-50/40">
                <header className="sticky top-0 z-40 border-b border-rose-100 bg-white sm:static">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                        <div className="flex items-center gap-3">
                            {categories.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setIsCategoryMenuOpen(true)}
                                    aria-label="Abrir categorías"
                                    aria-expanded={isCategoryMenuOpen}
                                    className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-md text-rose-600 hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-300 sm:hidden"
                                >
                                    <span className="h-0.5 w-5 bg-current" />
                                    <span className="h-0.5 w-5 bg-current" />
                                    <span className="h-0.5 w-5 bg-current" />
                                </button>
                            )}
                            <img
                                src="/images/tufis-logo.png"
                                alt="Tufi's Postres y Cupcakes"
                                className="h-16 w-16 object-contain"
                            />
                        </div>
                        {auth?.user ? (
                            <Link
                                href={route("dashboard")}
                                className="text-sm font-medium text-rose-600 hover:text-rose-800"
                            >
                                Panel de administración
                            </Link>
                        ) : (
                            <Link
                                href={route("login")}
                                className="text-sm font-medium text-gray-400 hover:text-rose-600"
                            >
                                Acceso staff
                            </Link>
                        )}
                    </div>
                </header>

                {categories.length > 0 && (
                    <nav className="sticky top-0 z-30 hidden border-b border-rose-100 bg-white sm:block">
                        <div
                            ref={categoryNavRef}
                            onPointerDown={startCategoryDrag}
                            onPointerMove={dragCategories}
                            onPointerUp={endCategoryDrag}
                            onPointerCancel={endCategoryDrag}
                            className="mx-auto flex max-w-6xl cursor-grab touch-pan-y gap-6 overflow-x-auto px-6 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden active:cursor-grabbing"
                        >
                            {categories.map((category) => (
                                <a
                                    key={category.id}
                                    ref={(element) => {
                                        categoryLinkRefs.current[
                                            category.slug
                                        ] = element;
                                    }}
                                    href={`#${category.slug}`}
                                    onClick={(event) =>
                                        scrollToCategory(event, category.slug)
                                    }
                                    onDragStart={(event) =>
                                        event.preventDefault()
                                    }
                                    aria-current={
                                        activeCategory === category.slug
                                            ? "location"
                                            : undefined
                                    }
                                    className={`shrink-0 whitespace-nowrap rounded-md px-2 py-1 text-sm font-medium uppercase tracking-wide transition ${
                                        activeCategory === category.slug
                                            ? "bg-rose-600 text-white"
                                            : "text-gray-500 hover:bg-rose-50 hover:text-rose-600"
                                    }`}
                                >
                                    {category.name}
                                </a>
                            ))}
                        </div>
                    </nav>
                )}

                {isCategoryMenuOpen && (
                    <div className="fixed inset-0 z-50 sm:hidden">
                        <button
                            type="button"
                            onClick={() => setIsCategoryMenuOpen(false)}
                            aria-label="Cerrar categorías"
                            className="absolute inset-0 bg-gray-900/30"
                        />
                        <nav
                            aria-label="Categorías"
                            className="relative flex h-full w-72 max-w-[calc(100%-3rem)] flex-col bg-white p-4 shadow-xl"
                        >
                            <button
                                type="button"
                                onClick={() => setIsCategoryMenuOpen(false)}
                                aria-label="Cerrar categorías"
                                className="mb-4 flex h-11 w-11 items-center justify-center rounded-md text-2xl text-rose-600 hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-300"
                            >
                                &times;
                            </button>
                            <div className="flex flex-col gap-1 overflow-y-auto">
                                {categories.map((category) => (
                                    <a
                                        key={category.id}
                                        href={`#${category.slug}`}
                                        onClick={(event) =>
                                            scrollToCategory(
                                                event,
                                                category.slug,
                                            )
                                        }
                                        aria-current={
                                            activeCategory === category.slug
                                                ? "location"
                                                : undefined
                                        }
                                        className={`rounded-md px-4 py-3 text-sm font-medium uppercase tracking-wide transition ${
                                            activeCategory === category.slug
                                                ? "bg-rose-600 text-white"
                                                : "text-gray-600 hover:bg-rose-50 hover:text-rose-600"
                                        }`}
                                    >
                                        {category.name}
                                    </a>
                                ))}
                            </div>
                        </nav>
                    </div>
                )}

                <section className="mx-auto max-w-6xl px-6 py-14 text-center">
                    <h1 className="font-serif text-4xl text-gray-900 sm:text-5xl">
                        Nuestro Menú
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                        Tartaletas, brownies, mini pavlovas y trufas hechas a
                        mano, con los mejores ingredientes, listas para tu
                        próxima celebración.
                    </p>
                </section>

                <main className="mx-auto max-w-6xl space-y-16 px-6 pb-20">
                    {categories.map((category) => (
                        <section
                            key={category.id}
                            id={category.slug}
                            className="scroll-mt-24"
                        >
                            <div className="mb-6 text-center">
                                <h2 className="font-serif text-3xl text-gray-900">
                                    {category.name}
                                </h2>
                                {category.description && (
                                    <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
                                        {category.description}
                                    </p>
                                )}
                            </div>

                            {category.products.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {category.products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-sm text-gray-400">
                                    Próximamente nuevos productos en esta
                                    categoría.
                                </p>
                            )}
                        </section>
                    ))}

                    {categories.length === 0 && (
                        <p className="text-center text-gray-400">
                            El menú estará disponible muy pronto.
                        </p>
                    )}
                </main>

                {showScrollTop && (
                    <button
                        type="button"
                        onClick={scrollToTop}
                        aria-label="Volver arriba"
                        title="Volver arriba"
                        className="fixed bottom-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-rose-600 text-2xl leading-none text-white shadow-lg transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
                    >
                        &#8593;
                    </button>
                )}

                <footer className="border-t border-rose-100 bg-white py-8 text-center text-sm text-gray-400">
                    <p>
                        © {new Date().getFullYear()} Tufis — Hecho por Caelum
                        Dev.
                    </p>
                </footer>
            </div>
        </>
    );
}
