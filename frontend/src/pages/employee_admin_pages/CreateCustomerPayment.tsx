
import { useAppContext } from "../../contexts/AppContext";
import ManageTransactionForm from "../../forms/ManageTransaction/ManageTransactionForm";
import * as apiClient from '../../api-client'
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";


const CreateCustomerTransaction =()=>
{ 
  const {showToast} = useAppContext();
  const queryClient = useQueryClient();
  const{customer_id} = useParams();

  const {data:transaction} = useQuery('fetchCustomerTransactions', ()=> apiClient.fetchCustomerTransactions(customer_id || ''),
  {
    enabled: !!customer_id
   });

  const {mutate} = useMutation(apiClient.updateCustomerPaymentTransaction, 
    {
      onSuccess:() => {
        queryClient.invalidateQueries('fetchCustomerTransactions');
        showToast({message: "Transaction submitted.", type:'success'});
        
      },
      onError:() => {
        showToast({message:'Error on processing transaction', type: 'error'});
      }
    });

  const  handleSubmit= (customerTransactionData:FormData) =>
   {
     mutate(customerTransactionData);
  }

  return (<ManageTransactionForm transaction={transaction} onUpdate={handleSubmit} />);
}

export  default CreateCustomerTransaction;