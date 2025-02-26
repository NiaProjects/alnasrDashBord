import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);


export  async function  showAlert(  {title , message , icon ="warning" , confirmButtonText , confirmButtonColor = "#d33" , confirmFun , confirmMessage = "Done !"} ) {

MySwal.fire({
        title: <strong>{title}</strong>,
        html: <i>{message}</i>,
        icon: icon,
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        confirmButtonColor: confirmButtonColor,
        cancelButtonText: 'Cancel'
      }).then((result) => {
        console.log(result);
        
        if (result.isConfirmed) {
          if(confirmFun) {
            confirmFun()
          }
          MySwal.fire(confirmMessage ,"" ,'success');
        }
      });


      
}

