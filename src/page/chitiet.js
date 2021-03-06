import footer from "./footer";
import Header from "./header";
import { get } from "../api/post";
import { $ } from "../utilis";
import { addToCart } from "../utilis/cart";
import "toastr/build/toastr.min.css";
import toastr from "toastr";

const chiTiet = {
   async  print(id) {
       const {data} = await get(id);
        return /* html */ `
        ${await Header.print()}
    <div class="mt-20 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8 ">
            <div class="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
        <img src="${data.img}" alt="Two each of gray, white, and black shirts laying flat." class="w-full h-full object-center object-cover" alt="">
        </div>
            <div class="mt-6 lg:mt-0 lg:row-span-3">
        <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          ${data.title}
        </h1>
        <p class="mt-3">${data.desc}</p>
        <h2 class="text-1xl font-extrabold tracking-tight text-gray-900 sm:text-1xl mt-5">${data.met}</h2>
        <p class="text-3xl text-gray-900 mt-20">${data.pice}</p>
    
        <!-- Reviews -->
        <div class="mt-6">
          <button id="btnAddToCart" type="submit" class="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Thêm giỏ hàng</button>

        </div>
            </div>
    </div>
   <div>${footer.print()}</div>
        `
    },
    afterRender(id){
      $("#btnAddToCart").addEventListener('click', async () => {
          const { data } = await get(id);
          addToCart({...data, quantity: 1}, function(){
              toastr.success(`Thêm  ${data.title} vào giỏ hàng thành công!`)
          })
      });
      Header.afterRender();
  }
};
export default chiTiet;