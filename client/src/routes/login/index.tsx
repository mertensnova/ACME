/* eslint-disable qwik/valid-lexical-scope */
import { component$, useSignal } from "@builder.io/qwik";
import axios from "axios";
import { API_URL } from "~/url";

export default component$(() => {
   const username = useSignal("");
   const password = useSignal("");
   // Use injectFunction to get the function from the QRL
   const loginUser = injectFunction(loginUserQRL);

   // Use the function as you normally would
   const handleSubmit = async (event: any) => {
      event.preventDefault();
      const username = event.target.username.value;
      const password = event.target.password.value;
      const response = await loginUser({ username, password });

      // Do something with response
   };

   return (
      <>
         <div class="flex items-center justify-center h-screen">
            <div class="w-full max-w-md">
               <form
                  action={`${API_URL}/login`}
                  method="POST"
                  onSubmit$={(e: any) => {
                     e.preventDefault();
                     loginUser({ username, password });
                  }}
                  class="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
               >
                  <div class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
                     Login
                  </div>
                  <div class="mb-4">
                     <label
                        class="block text-gray-700 text-sm font-normal mb-2"
                        for="username"
                     >
                        Username
                     </label>
                     <input
                        value={username.value}
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                     />
                  </div>
                  <div class="mb-6">
                     <label
                        class="block text-gray-700 text-sm font-normal mb-2"
                        for="password"
                     >
                        Password
                     </label>
                     <input
                        value={password.value}
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                     />
                  </div>
                  <div class="flex items-center justify-between">
                     <button
                        onClick$={() => {
                           loginUser({ username, password });
                        }}
                        class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                        type="button"
                     >
                        Sign In
                     </button>
                     <a
                        class="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
                        href="#"
                     >
                        Forgot Password?
                     </a>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
});
function injectFunction(loginUserQRL: any) {
   throw new Error("Function not implemented.");
}
