import  {createSlice} from "@reduxjs/toolkit";


const chatSlice=createSlice({
    name:"chat",
    initialState:{
        chatRooms:{},
        socket:false,
        messageRecieved:false
    },
    reducers:{
            setChatRooms:(state,action)=>{
                if(state.chatRooms[action.payload.user]){
                    state.chatRooms[action.payload.user].push({client:action.payload.message})

                  


                }else{
                  state.chatRooms= { ...state.chatRooms,[action.payload.user]:[{
                    client:action.payload.message
                  }]}

                 

                }


                },

                addChat:(state,action)=>{
                 
                  state.chatRooms[action.payload.user].push(action.payload.message)
                },
                setSocketGlobal:(state,action)=>{
                

                },
                setMessgeRecieved:(state,action)=>{
                  state.messageRecieved=true
                },
                resetMessageRecieved:(state,action)=>{
                  state.messageRecieved=false
                },
                removeChatRoom:(state,action)=>{
                  delete state.chatRooms[action.payload.socketId]

                }


            
    
               
               
            },
            // setMonthlyIncome:(state,action)=>{
    
            //     state.monthlyIncome=action.payload;
               
            // },
           
        }
        
    

)


export const {setChatRooms,addChat,setSocket,setMessgeRecieved,resetMessageRecieved,setSocketGlobal,removeChatRoom}=chatSlice.actions;
export default chatSlice.reducer;


