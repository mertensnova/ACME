/* eslint-disable qwik/jsx-img */
import { component$ } from "@builder.io/qwik";

export default component$(() => {
   return (
      <>
         <div class="container mx-auto px-4">
            <div class="flex justify-between items-center py-6">
               <div class="flex justify-start">
                  <h1 class="text-3xl font-bold text-blue-500">MyApp</h1>
               </div>
               <div class="flex justify-end">
                  <button
                     class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                     type="button"
                  >
                     Log Out
                  </button>
               </div>
            </div>
            <div class="grid grid-cols-3 gap-4">
               <div class="col-span-2">
                  <div class="bg-white rounded-lg p-6 mb-4 shadow-md">
                     <div class="flex items-center mb-4">
                        <img
                           class="w-12 h-12 rounded-full mr-4"
                           src="https://randomuser.me/api/portraits/men/32.jpg"
                           alt=""
                        />
                        <div>
                           <p class="text-gray-800 font-semibold">John Doe</p>
                           <p class="text-gray-600 text-sm">2 hours ago</p>
                        </div>
                     </div>
                     <p class="text-gray-800 mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nam vel tempus diam. Proin luctus mi eget magna
                        pellentesque, euismod interdum lacus elementum.
                     </p>
                     <img
                        class="rounded-md mb-4"
                        src="https://picsum.photos/500/200"
                        alt=""
                     />
                     <div class="flex justify-between items-center">
                        <div class="flex items-center">
                           <button
                              class="mr-2 text-gray-800 hover:text-blue-500 focus:outline-none"
                              type="button"
                           >
                              👍 Like
                           </button>
                           <button
                              class="text-gray-800 hover:text-blue-500 focus:outline-none"
                              type="button"
                           >
                              💬 Comment
                           </button>
                        </div>
                        <p class="text-gray-800 text-sm">12 likes</p>
                     </div>
                  </div>

                  <div class="bg-white rounded-lg p-6 mb-4 shadow-md">
                     <div class="flex items-center mb-4">
                        <img
                           class="w-12 h-12 rounded-full mr-4"
                           src="<URL>"
                           alt=""
                        />
                        <div>
                           <p class="text-gray-800 font-semibold">Jane Doe</p>
                           <p class="text-gray-600 text-sm">5 hours ago</p>
                        </div>
                     </div>
                     <p class="text-gray-800 mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nam vel tempus diam. Proin luctus mi eget magna
                        pellentesque, euismod interdum lacus elementum.
                     </p>
                     <img class="rounded-md mb-4" src="<URL>" alt="" />
                     <div class="flex justify-between items-center">
                        <div class="flex items-center">
                           <button
                              class="mr-2 text-gray-800 hover:text-blue-500 focus:outline-none"
                              type="button"
                           >
                              👍 Like
                           </button>
                           <button class="text-gray-800 hover:text-blue-500 focus:outline-none">
                              💬 Comment
                           </button>
                        </div>
                        <p class="text-gray-800 text-sm">7 likes</p>
                     </div>
                  </div>
               </div>
               <div>
                  <div class="bg-white rounded-lg p-6 mb-4 shadow-md">
                     <h2 class="text-gray-800 text-lg font-semibold mb-2">
                        Create Post
                     </h2>
                     <form>
                        <textarea
                           class="w-full rounded-md border p-2 mb-2"
                           placeholder="What's on your mind?"
                        ></textarea>
                        <button
                           class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 w-full"
                           type="submit"
                        >
                           Post
                        </button>
                     </form>
                  </div>

                  <div class="bg-white rounded-lg p-6 mb-4 shadow-md">
                     <h2 class="text-gray-800 text-lg font-semibold mb-4">
                        Friends
                     </h2>
                     <ul>
                        <li class="flex items-center mb-2">
                           <img
                              class="w-10 h-10 rounded-full mr-4"
                              src="<URL>"
                              alt=""
                           />
                           <p class="text-gray-800">John Doe</p>
                        </li>
                        <li class="flex items-center mb-2">
                           <img
                              class="w-10 h-10 rounded-full mr-4"
                              src="<URL>"
                              alt=""
                           />
                           <p class="text-gray-800">Jane Doe</p>
                        </li>
                        <li class="flex items-center">
                           <img
                              class="w-10 h-10 rounded-full mr-4"
                              src="<URL>"
                              alt=""
                           />
                           <p class="text-gray-800">Bob Smith</p>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
});
