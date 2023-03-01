import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const ResponseScreen = () => {
  const [searchParams] = useSearchParams()

  return (
    <>
      <h3>TRANSACTION RESULT</h3>
      {searchParams.get('transactionState') === '4' ? (
        <>
          <div className='list-group-item mt-3'>
            <h2>
              <strong>Congratulations!</strong>
            </h2>
            <h4>
              Transaction state:{' '}
              <strong>{searchParams.get('lapTransactionState')}</strong>
            </h4>
            <h4>Transaction reference: {searchParams.get('reference_pol')}</h4>
            <h4>Order number: {searchParams.get('referenceCode')}</h4>
          </div>
          <p className='pt-4'>
            <Link to='/'>Go Back</Link>
          </p>
        </>
      ) : (
        <>
          <div className='list-group-item mt-3'>
            <h3>Transaction error</h3>
          </div>
          <p className='pt-4'>
            <Link to='/'>Go Back</Link>
          </p>
        </>
      )}
    </>
  )
}

export default ResponseScreen
