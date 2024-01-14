import React from "react";
import { Link } from "react-router-dom";

const avgPrice = (productSizeList) => {
    let price = 0;

    for(let i=0;i<productSizeList.length;i++){
        price+= productSizeList[i].price;
    }

    return price/productSizeList.length;
}

export default function DisplayProducts({products}){
    const host = "http://localhost:5000";
    return <div className="flex flex-row flex-wrap gap-2 w-full justify-center items-center">
        {products.map((product)=>{
            return (
                <Link key={product._id} to={`/product/${product._id}`} className="w-1/4 flex flex-col justify-center items-center gap-4 gapy-4 shadow-lg p-4 bg-white-400">
                    <img src={host+"/uploads/"+product.thumbnail} className="rounded-lg" />
                    <div className="flex flex-col justify-center self-start pl-2">
                    {
                        (Date.now() - Date.parse(product.createdAt))<604800000 && <p className="text-coral-red text-lg">
                            Just Arrived
                        </p>
                    }
                    {
                        product.isIconic && <p className="text-coral-red text-lg">
                        Iconic
                    </p>
                    }
                    <p className="text-black text-lg">{product.name}</p>
                    <p className="text-slate-gray text-lg">MRP : &#8377; {avgPrice(product.sizes)}*</p>
                    </div>
                </Link >
            )
        })}
    </div>
}