import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { formatKES, resolveImage } from "@/lib/products";
import { toast } from "sonner";

export interface ProductCardData {
  id: string;
  slug: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image_url: string | null;
}

const ProductCard = ({ p }: { p: ProductCardData }) => {
  const { add } = useCart();
  const img = resolveImage(p.image_url, p.category);
  const inStock = p.stock > 0;

  return (
    <div className="group relative bg-white border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-elevated hover:-translate-y-2">
      <Link to={`/product/${p.slug}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={img} alt={p.name} loading="lazy" width={800} height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="outline" className="font-black text-[9px] uppercase border-[#D4AF37] bg-white text-[#004B50] rounded-none px-3 py-1">
            {p.category}
          </Badge>
        </div>
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#004B50]/60 backdrop-blur-sm">
            <span className="font-black text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">Sold Out</span>
          </div>
        )}
      </Link>
      <div className="p-6 flex flex-col gap-6">
        <Link to={`/product/${p.slug}`}>
          <h3 className="font-black text-xs uppercase tracking-tight leading-tight line-clamp-2 hover:text-[#D4AF37] transition-colors h-8 text-[#002D30]">
            {p.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div>
            <div className="text-sm font-black text-[#004B50]">{formatKES(p.price)}</div>
            <div className="text-[9px] text-muted-foreground font-bold uppercase tracking-[0.2em] mt-1">
              {inStock ? `${p.stock} Units left` : "Out of stock"}
            </div>
          </div>
          <Button
            size="sm"
            disabled={!inStock}
            onClick={(e) => {
              e.preventDefault();
              add({ id: p.id, name: p.name, price: Number(p.price), image: img, category: p.category });
              toast.success(`${p.name} added to cart`);
            }}
            className="bg-[#004B50] hover:bg-[#D4AF37] hover:text-[#002D30] text-white font-black rounded-none h-10 px-5 text-[9px] uppercase tracking-widest shadow-lg transition-all"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
