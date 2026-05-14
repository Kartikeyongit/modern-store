"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import { X, Upload, ImagePlus } from "lucide-react";

export function AdminProductsClient({ initialProducts }: { initialProducts: any[] }) {
  const [allProducts, setAllProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Accessories",
    price: "",
    description: "",
    stock: "",
    imageUrl: "",
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "Accessories",
    price: "",
    description: "",
    stock: "",
    imageUrl: "",
  });
  const [editUploadedImages, setEditUploadedImages] = useState<string[]>([]);
  const [isEditUploading, setIsEditUploading] = useState(false);

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || (product as any).status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ["All", ...new Set(allProducts.map((p) => p.category))];
  const statuses = ["All", "Active", "Draft"];
  
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
    
      // Parse the images JSON string into an array
      const parsedData = data.map((product: any) => ({
        ...product,
        images: typeof product.images === 'string' 
          ? JSON.parse(product.images) 
          : product.images,
      }));
    
      setAllProducts(parsedData);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDropdownDirection = (productId: string) => {
    const index = allProducts.findIndex((p) => p.id === productId);
    const totalItems = allProducts.length;
    // If it's among the last 3 items, open upward
    if (index >= totalItems - 3) {
      return "bottom-full mb-1";
    }
    // Otherwise open downward
    return "top-full mt-1";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">Manage your product catalog ({allProducts.length} total)</p>
        </div>
            <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-gray-800 text-white"
            >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
            </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 px-3 rounded-lg border border-gray-200 text-sm"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-10 px-3 rounded-lg border border-gray-200 text-sm"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto relative">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3 w-12">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Category
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Price
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Stock
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => {
                const status = (product as any).status || "Active";
                const stock = (product as any).stock ?? 0;
                return (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={
                        status === "Active"
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-100 border-0"
                      }>
                        {status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {stock}
                    </td>
                    <td className="px-6 py-4 text-right relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>

                    {openMenuId === product.id && (
                        <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setOpenMenuId(null)}
                        />
                        <div className={`absolute right-0 ${getDropdownDirection(product.id)} w-40 bg-white rounded-xl shadow-xl border z-50 overflow-hidden`}>
                            <button
                            onClick={() => setOpenMenuId(null)}
                            className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                            <Eye className="h-4 w-4 mr-2 text-gray-400" />
                            View
                            </button>
                            <button
                              onClick={() => {
                                setEditingProduct(product);
                                setEditForm({
                                  name: product.name || "",
                                  category: product.category || "Accessories",
                                  price: String(product.price || ""),
                                  description: product.description || "",
                                  stock: String(product.stock || ""),
                                  imageUrl: "",
                                });
                                setEditUploadedImages(
                                  Array.isArray(product.images) ? product.images : 
                                  typeof product.images === 'string' ? JSON.parse(product.images) : []
                                );
                                setShowEditModal(true);
                                setOpenMenuId(null);
                              }}
                              className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <Edit className="h-4 w-4 mr-2 text-gray-400" />
                              Edit
                            </button>
                            <div className="border-t" />
                            <button
                            onClick={async () => {
                            try {
                                await fetch(`/api/products/${product.id}`, { method: "DELETE" });
                                fetchProducts();
                                setOpenMenuId(null);
                            } catch (error) {
                                console.error("Failed to delete product:", error);
                            }
                            }}
                            className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                            </button>
                        </div>
                        </>
                    )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <p className="text-sm text-gray-500">
            Showing {filteredProducts.length} of {allProducts.length} products
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-black text-white">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
        {/* Add Product Modal */}
        {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
                <h2 className="text-lg font-bold text-gray-900">Add New Product</h2>
                <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAddModal(false)}
                >
                <X className="h-5 w-5" />
                </Button>
            </div>

            {/* Scrollable Form Area */}
            <div className="overflow-y-auto flex-1">
                <form
                onSubmit={async (e) => {
                e.preventDefault();

                // Get images from upload or URL
                let images: string[] = [];
                if (uploadedImages.length > 0) {
                  images = uploadedImages;
                } else if (newProduct.imageUrl) {
                  images = newProduct.imageUrl
                    .split("\n")
                    .map((url) => url.trim())
                    .filter((url) => url.length > 0);
                } else {
                  images = ["https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&h=800&fit=crop"];
                }
                              
                try {
                    const res = await fetch("/api/products", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: newProduct.name,
                        category: newProduct.category,
                        price: parseFloat(newProduct.price),
                        description: newProduct.description,
                        stock: parseInt(newProduct.stock) || 0,
                        images: images,
                      }),
                    });
                    
                    if (res.ok) {
                    fetchProducts();
                    setShowAddModal(false);
                    setNewProduct({ name: "", category: "Accessories", price: "", description: "", stock: "", imageUrl: "" });
                    setUploadedImages([]);
                    }
                } catch (error) {
                    console.error("Failed to add product:", error);
                }
                }}
                className="p-6 space-y-5"
                >
                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                    </label>
                    <Input
                    required
                    value={newProduct.name}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    placeholder="Enter product name"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                    </label>
                    <select
                    required
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                    <option value="Accessories">Accessories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home & Living">Home & Living</option>
                    </select>
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($) *
                    </label>
                    <Input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                        }
                        placeholder="0.00"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock *
                    </label>
                    <Input
                        type="number"
                        required
                        min="0"
                        value={newProduct.stock}
                        onChange={(e) =>
                        setNewProduct({ ...newProduct, stock: e.target.value })
                        }
                        placeholder="0"
                    />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                    </label>
                    <textarea
                    value={newProduct.description}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, description: e.target.value })
                    }
                    rows={3}
                    placeholder="Enter product description"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                    />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images
                  </label>
                  
                  {/* Uploaded Images Preview */}
                  {uploadedImages.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-4">
                      {uploadedImages.map((url, index) => (
                        <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 group">
                          <Image
                            src={url}
                            alt={`Product image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                          <button
                            type="button"
                            onClick={() => setUploadedImages(uploadedImages.filter((_, i) => i !== index))}
                            className="absolute top-1 right-1 p-1 rounded-full bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          {index === 0 && (
                            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black text-white text-[10px] font-medium">
                              Main
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  {uploadedImages.length < 5 && (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-black transition-colors">
                      <UploadButton<OurFileRouter, "productImage">
                        endpoint="productImage"
                        onClientUploadComplete={(res) => {
                          if (res) {
                            const newUrls = res.map((file) => file.url);
                            setUploadedImages([...uploadedImages, ...newUrls]);
                            setIsUploading(false);
                          }
                        }}
                        onUploadError={(error) => {
                          console.error("Upload error:", error);
                          setIsUploading(false);
                        }}
                        onUploadBegin={() => {
                          setIsUploading(true);
                        }}
                        appearance={{
                          button: "bg-gray-800 text-white text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity ut-ready:bg-gray-800 ut-uploading:bg-gray-600",
                          container: "flex flex-col items-center gap-2",
                          allowedContent: "text-xs text-gray-400",
                        }}
                      />
                      <p className="text-xs text-gray-400 mt-2">
                        Upload up to 5 images. First image will be the main display.
                      </p>
                    </div>
                  )}

                  {/* Loading Indicator */}
                  {isUploading && (
                    <div className="flex items-center gap-2 text-sm text-gray-800 mt-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-800 border-t-transparent" />
                      Uploading images...
                    </div>
                  )}

                  {/* Also keep URL input as fallback */}
                  <div className="mt-4 pt-4 border-t">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or paste image URLs (one per line)
                    </label>
                    <textarea
                      value={newProduct.imageUrl}
                      onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                      rows={3}
                      placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                    <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowAddModal(false)}
                    >
                    Cancel
                    </Button>
                    <Button
                    type="submit"
                    className="flex-1 bg-gray-800 text-white"
                    >
                    Add Product
                    </Button>
                </div>
                </form>
            </div>
            </div>
        </div>
        )}
        {/* Edit Product Modal */}
        {showEditModal && editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setShowEditModal(false);
                setEditingProduct(null);
              }}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
                <h2 className="text-lg font-bold text-gray-900">Edit Product</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingProduct(null);
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Scrollable Form Area */}
              <div className="overflow-y-auto flex-1">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    let images: string[] = [];
                    if (editUploadedImages.length > 0) {
                      images = editUploadedImages;
                    } else if (editForm.imageUrl) {
                      images = editForm.imageUrl
                        .split("\n")
                        .map((url) => url.trim())
                        .filter((url) => url.length > 0);
                    } else {
                      images = editingProduct.images || [];
                    }

                    try {
                      const res = await fetch(`/api/products/${editingProduct.id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          name: editForm.name,
                          category: editForm.category,
                          price: parseFloat(editForm.price),
                          description: editForm.description,
                          stock: parseInt(editForm.stock) || 0,
                          images: images,
                        }),
                      });

                      if (res.ok) {
                        fetchProducts();
                        setShowEditModal(false);
                        setEditingProduct(null);
                        setEditUploadedImages([]);
                      }
                    } catch (error) {
                      console.error("Failed to update product:", error);
                    }
                  }}
                  className="p-6 space-y-5"
                >
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <Input
                      required
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      placeholder="Enter product name"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({ ...editForm, category: e.target.value })
                      }
                      className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="Accessories">Accessories</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Home & Living">Home & Living</option>
                    </select>
                  </div>

                  {/* Price & Stock */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($) *
                      </label>
                      <Input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={editForm.price}
                        onChange={(e) =>
                          setEditForm({ ...editForm, price: e.target.value })
                        }
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock *
                      </label>
                      <Input
                        type="number"
                        required
                        min="0"
                        value={editForm.stock}
                        onChange={(e) =>
                          setEditForm({ ...editForm, stock: e.target.value })
                        }
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({ ...editForm, description: e.target.value })
                      }
                      rows={3}
                      placeholder="Enter product description"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Images
                    </label>

                    {/* Existing Images */}
                    {editUploadedImages.length > 0 && (
                      <div className="flex flex-wrap gap-3 mb-4">
                        {editUploadedImages.map((url, index) => (
                          <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 group">
                            <Image
                              src={url}
                              alt={`Product image ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                            <button
                              type="button"
                              onClick={() => setEditUploadedImages(editUploadedImages.filter((_, i) => i !== index))}
                              className="absolute top-1 right-1 p-1 rounded-full bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            {index === 0 && (
                              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black text-white text-[10px] font-medium">
                                Main
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload Button */}
                    {editUploadedImages.length < 5 && (
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-black transition-colors">
                        <UploadButton<OurFileRouter, "productImage">
                          endpoint="productImage"
                          onClientUploadComplete={(res) => {
                            if (res) {
                              const newUrls = res.map((file) => file.url);
                              setEditUploadedImages([...editUploadedImages, ...newUrls]);
                              setIsEditUploading(false);
                            }
                          }}
                          onUploadError={(error) => {
                            console.error("Upload error:", error);
                            setIsEditUploading(false);
                          }}
                          onUploadBegin={() => {
                            setIsEditUploading(true);
                          }}
                          appearance={{
                            button: "bg-gray-800 text-white text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity",
                            container: "flex flex-col items-center gap-2",
                            allowedContent: "text-xs text-gray-400",
                          }}
                        />
                      </div>
                    )}

                    {isEditUploading && (
                      <div className="flex items-center gap-2 text-sm text-gray-800 mt-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-800 border-t-transparent" />
                        Uploading images...
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Or paste image URLs (one per line)
                      </label>
                      <textarea
                        value={editForm.imageUrl}
                        onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                        rows={3}
                        placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setShowEditModal(false);
                        setEditingProduct(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gray-800 text-white"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}