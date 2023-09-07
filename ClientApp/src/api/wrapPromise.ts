type Request<T> = { status: 'pending' | 'success' | 'error', response: T | null };

function wrapPromise<T>(promise: Promise<T>) {
    const request: Request<T> = {
        status: 'pending',
        response: null,
    }
  
    const suspender = promise.then(
      (res) => {
        request.status = 'success';
        request.response = res;
      },
      (err) => {
        request.status = 'error';
        request.response = err;
      },
    )
  
    const read = () => {
      switch (request.status) {
        case 'pending':
          throw suspender;
        case 'error':
          throw request.response;
        default:
          return request.response
      }
    }
  
    return { read }
  }
  
  export default wrapPromise