export function performSend(postdata: any) {
    const apiEndpoint = '/api/sendEmail';
  
    return fetch(apiEndpoint, {
      method: 'POST',
      body: JSON.stringify(postdata),
    })
      .then((res) => res.json())
      .then((response) => response)
      .catch((err) => err);
  }