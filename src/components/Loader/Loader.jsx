import React from 'react'
import  { TailSpin }  from  'react-loader-spinner'
import { LoaderOverlay } from './Loader.styled';

export const Loader = () => {
        return (
          <LoaderOverlay> 
            <TailSpin
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{position: 'absolute', top: '30%', left: '43%'}}
              wrapperClass="tail-spin-loading"
              visible={true}
            />
          </LoaderOverlay>
        ) 
}
