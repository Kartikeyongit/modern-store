"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star, MessageSquare, Check, Loader2 } from "lucide-react";

export function OrderReview({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) {
      setError("Please write a review.");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, title, body }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || "Failed to submit review.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
        <Check className="h-4 w-4" />
        Review submitted — {rating}★ {title && `"${title}"`}
      </div>
    );
  }

  return (
    <div className="mt-2">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-black transition-colors"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Write a Review
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-3 space-y-2.5 border">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-700">Review {productName}</p>
            <button
              type="button"
              onClick={() => { setOpen(false); setError(""); }}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Cancel
            </button>
          </div>

          {/* Stars */}
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)} className="p-0.5">
                <Star
                  className={cn(
                    "h-4 w-4",
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  )}
                />
              </button>
            ))}
          </div>

          {/* Title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-black"
          />

          {/* Body */}
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share your experience with this product..."
            required
            rows={3}
            className="w-full rounded-md border border-gray-200 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-black resize-none"
          />

          {error && <p className="text-xs text-red-600">{error}</p>}

          <Button
            type="submit"
            disabled={submitting}
            size="sm"
            className="bg-black text-white hover:bg-white hover:text-black border-2 border-black text-xs h-7 transition-colors"
          >
            {submitting ? (
              <><Loader2 className="h-3 w-3 mr-1 animate-spin" />Submitting...</>
            ) : (
              "Submit Review"
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
