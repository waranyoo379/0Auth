import Link from "next/link"; 
import { auth } from "@/app/auth"; 
import { getProducts } from "@/lib/products"; 
import { AuthButtons } from "@/components/auth-buttons"; 
 
export default async function HomePage() { 
  const session = await auth(); 
  const products = getProducts(); 
  // เติม: ฟังก์ชันที่แปลงค่าเป็น true หรือ false 
  const isLoggedIn = !!session?.user; 
 
  return ( 
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8"> 
      <header className="mx-auto mb-8 max-w-6xl"> 
        <h1 className="text-3xl font-bold">สินค้า</h1> 
        <AuthButtons isLoggedIn={isLoggedIn} userName={session?.user?.name} /> 
      </header> 
 
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3"> 
        {products.map((product) => ( 
          <article key={product.id} data-testid="product" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"> 
            <h2 className="mb-3 text-xl font-semibold">{product.name}</h2> 
            <p className="mb-3 text-slate-600">{product.description}</p> 
            <p className="mb-4 font-semibold text-slate-900">฿{product.price.toLocaleString("th-TH")}</p> 
            {isLoggedIn && ( 
              <div className="flex gap-3"> 
                <Link href={`/products/${product.id}/edit`} className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700">แก้ไข</Link> 
                <Link href={`/products/${product.id}/delete`} className="rounded-md bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700">ลบ</Link> 
              </div> 
            )} 
          </article> 
        ))} 
        {products.length === 0 && <p className="text-slate-600">ไม่มีสินค้า</p>} 
      </div> 
    </main> 
  ); 
}