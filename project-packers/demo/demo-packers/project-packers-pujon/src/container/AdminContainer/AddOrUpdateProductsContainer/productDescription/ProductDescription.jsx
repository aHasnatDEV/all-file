import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";

const ProductDescription = ({ register, prevProducts }) => {
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      register("description", { value: editorRef.current.getContent() });
    }
  };

  return (
    <div className="w-full p-3 rounded-lg border">
      {/* product name */}
      <div className="mb-2">
        <label
          htmlFor="productName"
          className="text-sm font-normal text-slate-600"
        >
          Product Name
        </label>
        <input
          //value={prevProducts && prevProducts.name}
          {...register("name")}
          type="text"
          className="w-full py-2 px-3 border rounded outline-none"
          id="productName"
        />
      </div>

      {/* description */}
      <div className="">
        <label
          htmlFor="productDescription"
          className="text-sm font-normal text-slate-600"
        >
          Description
        </label>

        <Editor
          apiKey="your-api-key"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={prevProducts ? prevProducts.name : ""}
          inline
          init={{
            height: 500,

            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar: "bold italic underline   " + "  bullist numlist  + link",

            selector: "textarea", // change this value according to your HTML
            content_style:
              ".mce-content-body { height: 20rem; border:1px solid #E5E7EB; outline:none; padding:1rem } " +
              `.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {

								padding: 0 1rem;
								}
								`,
            menubar: false,
            placeholder: "Product Descriptions...",
          }}
          onChange={() => log()}
        />
      </div>
    </div>
  );
};

export default ProductDescription;
