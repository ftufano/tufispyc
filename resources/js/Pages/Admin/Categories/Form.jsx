import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function CategoryForm({
    data,
    setData,
    errors,
    processing,
    onSubmit,
    submitLabel,
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div>
                <InputLabel htmlFor="name" value="Nombre" />
                <TextInput
                    id="name"
                    className="mt-1 block w-full"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    isFocused
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Descripción" />
                <textarea
                    id="description"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={3}
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="sort_order" value="Orden" />
                <TextInput
                    id="sort_order"
                    type="number"
                    className="mt-1 block w-full"
                    value={data.sort_order}
                    onChange={(e) => setData("sort_order", e.target.value)}
                />
                <InputError message={errors.sort_order} className="mt-2" />
            </div>

            <div className="flex items-center">
                <input
                    id="is_active"
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    checked={data.is_active}
                    onChange={(e) => setData("is_active", e.target.checked)}
                />
                <label
                    htmlFor="is_active"
                    className="ms-2 text-sm text-gray-600"
                >
                    Visible en el menú público
                </label>
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>
                    {submitLabel}
                </PrimaryButton>
            </div>
        </form>
    );
}
