import React from "react";
import ImageUploading from "react-images-uploading";

export function ImageUpload(props) {
         const [images, setImages] = React.useState([]);
         const maxNumber = 3;
        const imageList =[];
         const onChange = (imageList, addUpdateIndex) => {
           // data for submit
           console.log(imageList, addUpdateIndex);
           setImages(imageList);
           props.setImages(imageList)
         };

         return (
           <div className="App">
             <ImageUploading
               multiple
               value={images}
               onChange={onChange}
               maxNumber={maxNumber}
               dataURLKey="data_url"
             >
               {({
                 imageList,
                 onImageUpload,
                 onImageRemoveAll,
                 onImageUpdate,
                 onImageRemove,
                 isDragging,
                 dragProps,
               }) => (
                 // write your building UI
                 <div className="upload__image-wrapper">
                   <button
                     style={isDragging ? { color: "red" } : undefined}
                     onClick={onImageUpload}
                     {...dragProps}
                   >
                     גורר או לחץ{" "}
                   </button>
                   &nbsp;
                   <button onClick={onImageRemoveAll}>הסר הכל</button>
                   {imageList.map((image, index) => (
                     <div key={index} className="image-item">
                       <img src={image["data_url"]} alt="" width="100" />
                       <div className="image-item__btn-wrapper">
                         <button onClick={() => onImageUpdate(index)}>
                           עדכן
                         </button>
                         <button onClick={() => onImageRemove(index)}>
                           הסר
                         </button>
                       </div>
                     </div>
                   ))}
                   {({ imageList, onImageUpload, onImageRemoveAll, errors }) =>
                     errors && (
                       <div>
                         {errors.maxNumber && (
                           <span>
                             Number of selected images exceed maxNumber
                           </span>
                         )}
                         {errors.acceptType && (
                           <span>Your selected file type is not allow</span>
                         )}
                         {errors.maxFileSize && (
                           <span>Selected file size exceed maxFileSize</span>
                         )}
                         {errors.resolution && (
                           <span>
                             Selected file is not match your desired resolution
                           </span>
                         )}
                       </div>
                     )
                   }
                 </div>
               )}
             </ImageUploading>
           </div>
         );
       }
