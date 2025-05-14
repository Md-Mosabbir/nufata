import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Container, Heading, Table, Text, Button, Input } from "@medusajs/ui"
import { useState } from "react"
import { sdk } from "../lib/sdk"

const ProductIngredientsWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {
  const productId = data.id
  const queryClient = useQueryClient()
  const [editIngredient, setEditIngredient] = useState<any | null>(null)
  const [editForm, setEditForm] = useState({ name: "", grams: "", removable: false })
  const [showEditModal, setShowEditModal] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createForm, setCreateForm] = useState({ name: "", grams: "", removable: false })

  const {
    data: ingredientsData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ingredients", productId],
    queryFn: async () => {
      const res = await fetch(`/admin/products/${productId}/ingredients`)
      if (!res.ok) throw new Error("Failed to fetch ingredients")
      const json = await res.json()
      return json.ingredients || []
    },
    enabled: !!productId,
  })

  const deleteMutation = useMutation({
    mutationFn: async (ingredientId: string) => {
      await sdk.client.fetch(`/admin/products/${productId}/ingredients/${ingredientId}`, {
        method: "DELETE"
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients", productId] })
      setDeletingId(null)
    },
    onError: (err: any) => {
      alert(err?.message || "Failed to delete ingredient")
      setDeletingId(null)
    }
  })

  const patchMutation = useMutation({
    mutationFn: async ({ id, name, grams, removable }: any) => {
      await sdk.client.fetch(`/admin/products/${productId}/ingredients/${id}`, {
        method: "PATCH",
        body: { name, grams: Number(grams), removable },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients", productId] })
      setShowEditModal(false)
      setEditIngredient(null)
    },
    onError: (err: any) => {
      alert(err?.message || "Failed to update ingredient")
    }
  })

  const createMutation = useMutation({
    mutationFn: async ({ name, grams, removable }: any) => {
      await sdk.client.fetch(`/admin/products/${productId}/ingredients`, {
        method: "POST",
        body: { name, grams: Number(grams), removable },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients", productId] })
      setShowCreateModal(false)
      setCreateForm({ name: "", grams: "", removable: false })
    },
    onError: (err: any) => {
      alert(err?.message || "Failed to create ingredient")
    }
  })

  const handleEdit = (ingredient: any) => {
    setEditIngredient(ingredient)
    setEditForm({
      name: ingredient.name,
      grams: ingredient.grams.toString(),
      removable: ingredient.removable,
    })
    setShowEditModal(true)
  }

  const handleEditSubmit = (e: any) => {
    e.preventDefault()
    patchMutation.mutate({
      id: editIngredient.id,
      ...editForm,
    })
  }

  const handleCreateSubmit = (e: any) => {
    e.preventDefault()
    createMutation.mutate(createForm)
  }

  return (
    <Container>
      <div className="flex items-center justify-between mb-6">
        <Heading level="h2" className="text-base font-semibold tracking-wide text-ui-fg-subtle uppercase">Ingredients</Heading>
        <Button size="small" variant="primary" className="rounded-md" onClick={() => setShowCreateModal(true)}>
          Add
        </Button>
      </div>
      {isLoading ? (
        <Text className="text-ui-fg-muted">Loading ingredients...</Text>
      ) : error ? (
        <Text className="text-ui-fg-error">Error loading ingredients.</Text>
      ) : ingredientsData.length === 0 ? (
        <Text className="text-ui-fg-muted">No ingredients found for this product.</Text>
      ) : (
        <Table className="w-full text-sm mt-0">
          <thead>
            <tr className="border-b border-ui-border-base">
              <th className="text-left py-2 px-2 text-xs font-semibold tracking-wider text-ui-fg-muted uppercase">Name</th>
              <th className="text-left py-2 px-2 text-xs font-semibold tracking-wider text-ui-fg-muted uppercase">Grams</th>
              <th className="text-left py-2 px-2 text-xs font-semibold tracking-wider text-ui-fg-muted uppercase">Removable</th>
              <th className="text-left py-2 px-2 text-xs font-semibold tracking-wider text-ui-fg-muted uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ingredientsData.map((ingredient: any, idx: number) => (
              <tr key={ingredient.id} className={idx % 2 === 0 ? "bg-ui-bg-base" : "bg-transparent"}>
                <td className="py-2 px-2 align-middle">{ingredient.name}</td>
                <td className="py-2 px-2 align-middle">{ingredient.grams}g</td>
                <td className="py-2 px-2 align-middle">
                  {ingredient.removable ? (
                    <span className="inline-block rounded px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Yes</span>
                  ) : (
                    <span className="inline-block rounded px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300">No</span>
                  )}
                </td>
                <td className="py-2 px-2 align-middle flex gap-2">
                  <Button size="small" variant="secondary" className="rounded-md" onClick={() => handleEdit(ingredient)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="danger"
                    className="rounded-md"
                    isLoading={deletingId === ingredient.id && deleteMutation.status === 'pending'}
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this ingredient?")) {
                        setDeletingId(ingredient.id)
                        deleteMutation.mutate(ingredient.id)
                      }
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-ui-bg-base rounded-lg shadow-lg p-6 min-w-[320px] max-w-[90vw]">
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <Heading level="h3" className="text-base font-semibold mb-2 tracking-wide text-ui-fg-subtle uppercase">Edit Ingredient</Heading>
              <label className="text-xs font-semibold text-ui-fg-muted uppercase">
                Name
                <Input
                  value={editForm.name}
                  onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className="mt-1"
                />
              </label>
              <label className="text-xs font-semibold text-ui-fg-muted uppercase">
                Grams
                <Input
                  type="number"
                  value={editForm.grams}
                  onChange={e => setEditForm(f => ({ ...f, grams: e.target.value }))}
                  required
                  min={0}
                  className="mt-1"
                />
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-ui-fg-muted uppercase">
                <input
                  type="checkbox"
                  checked={editForm.removable}
                  onChange={e => setEditForm(f => ({ ...f, removable: e.target.checked }))}
                  className="accent-ui-fg-interactive"
                />
                Removable
              </label>
              <div className="flex gap-2 justify-end mt-2">
                <Button type="button" variant="secondary" className="rounded-md" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={patchMutation.status === 'pending'} className="rounded-md">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-ui-bg-base rounded-lg shadow-lg p-6 min-w-[320px] max-w-[90vw]">
            <form onSubmit={handleCreateSubmit} className="flex flex-col gap-4">
              <Heading level="h3" className="text-base font-semibold mb-2 tracking-wide text-ui-fg-subtle uppercase">Add Ingredient</Heading>
              <label className="text-xs font-semibold text-ui-fg-muted uppercase">
                Name
                <Input
                  value={createForm.name}
                  onChange={e => setCreateForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className="mt-1"
                />
              </label>
              <label className="text-xs font-semibold text-ui-fg-muted uppercase">
                Grams
                <Input
                  type="number"
                  value={createForm.grams}
                  onChange={e => setCreateForm(f => ({ ...f, grams: e.target.value }))}
                  required
                  min={0}
                  className="mt-1"
                />
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-ui-fg-muted uppercase">
                <input
                  type="checkbox"
                  checked={createForm.removable}
                  onChange={e => setCreateForm(f => ({ ...f, removable: e.target.checked }))}
                  className="accent-ui-fg-interactive"
                />
                Removable
              </label>
              <div className="flex gap-2 justify-end mt-2">
                <Button type="button" variant="secondary" className="rounded-md" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={createMutation.status === 'pending'} className="rounded-md">
                  Add
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default ProductIngredientsWidget 