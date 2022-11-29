import React, { useState } from "react";
import { Modal, Button, Text, Textarea } from "@nextui-org/react";
import { API_URL } from "../pages/api/url";
import Pen from "./icons/Pen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import axios from "axios";
import { user } from "../pages/api/auth";

export default function AddPostModal() {
   const router = useRouter();
   const handler = () => setVisible(true);
   const [visible, setVisible] = React.useState(false);

   const userid = user?.ID;
   const [content, setContent] = useState("");

   const closeHandler = () => {
      setVisible(false);
   };
   const addPost = async () => {
      const notify = () =>
         toast.success("Post added", {
            theme: "dark",
         });

      try {
         const response = await axios.post(
            `${API_URL}/add-post`,
            {
               userid,
               content,
            },
            { withCredentials: true }
         );
         notify();
         router.replace(router.asPath);
         return response;
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <ToastContainer />
         <div>
            <style jsx>{`
               div {
                  position: relative;
               }
            `}</style>
            <Button
               css={{
                  position: "fixed",
                  bottom: 100,
                  right: 160,
                  borderRadius: 9999,
                  width: "60px",
                  height: "60px",
               }}
               auto
               flat
               color={"primary"}
               onClick={handler}
            >
               <Pen fill="currentColor" />
            </Button>
            <form action={`${API_URL}/add-post`} method="POST" id="postform">
               <Modal
                  blur
                  closeButton
                  width="500px"
                  aria-labelledby="modal-title"
                  open={visible}
                  onClose={closeHandler}
               >
                  <Modal.Header>
                     <Text id="modal-title" size={18}>
                        Write
                     </Text>
                  </Modal.Header>

                  <Modal.Body>
                     <Textarea
                        bordered
                        name="Content"
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Content"
                        form="postform"
                        onChange={(e) => setContent(e.target.value)}
                     />
                  </Modal.Body>
                  <Modal.Footer>
                     <Button auto flat color="error" onClick={closeHandler}>
                        Close
                     </Button>
                     <Button
                        form="postform"
                        onClick={addPost}
                        flat
                        auto
                        color={"success"}
                     >
                        Post
                     </Button>
                  </Modal.Footer>
               </Modal>
            </form>
         </div>
      </>
   );
}
