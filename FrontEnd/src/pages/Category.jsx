import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gettokens } from "../redux/features/user/userSlice"
import { DisplayProducts } from "../components";
import { fetchProductsByCategory } from "../redux/features/product/productSlice";

function Category({ categoryName }) {
  const [isActive, setIsActive] = useState("");
  const { allProducts, loading } = useSelector((state) => state.product);
  const [currentProducts, setCurrentProducts] = useState([]);
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    dispatch(gettokens());
    dispatch(fetchProductsByCategory(categoryName));
  }, [categoryName])
  
  useEffect(() => {
    setCurrentProducts(allProducts)
    if (allProducts.length > 0) {
      for(let i=0;i<allProducts.length;i++){
        if(allProducts[i].products.length>0){
          setIsActive(allProducts[i].subCategoryName)
          break
        }else{
          setIsActive("")
        }
      }
    }
  }, [allProducts])

  const clickHandler = (e) => {
    setIsActive(e.target.innerText);
  }

  return (
    <div className="min-h-[50vh]">
      
      {!loading && <div className="">
        <div className="z-50 bg-primary py-4 flex flex-row justify-center items-center gap-4 font-palanquin font-medium text-2xl text-slate-gray sticky top-0 relative">
        <p className="absolute top-4 left-2 font-palanquin font-bold text-black font-medium max-sm:text-xl">{categoryName}</p>
          {
            currentProducts.map((subCategory) => {
              if(subCategory.products.length){
              return (
                <p key={subCategory._id} className={`hover:text-coral-red ${isActive === subCategory.subCategoryName ? "text-coral-red" : ""}`} onClick={clickHandler} name={subCategory.subCategoryName}>{subCategory.subCategoryName}</p>
              )
            } return<></>
            })
          }
        </div>
        {
          currentProducts.map((subCategory) => {
            if (subCategory.subCategoryName === isActive) {
              return <div key={subCategory._id} className="my-4">
                <DisplayProducts products={subCategory.products} />
              </div>
            }
          })
        }
      </div>
      }
      {
        loading && <div className="w-full h-[50vh] text-black text-6xl">
          Loading
        </div>
      }
    </div>
  );
}

export default Category;
