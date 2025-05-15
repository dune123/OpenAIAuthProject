export async function getImageLabels(imageBase64) {
    const PAT = "f5cc57ac4b3b4e3cba61336a097fb6e5"; // Replace this
    const USER_ID = "qzbnd0m1joiz";           // Found in Clarifai dashboard
    const APP_ID = "Iamironman-1234";             // Replace with your Clarifai App ID
  
    const response = await fetch("https://api.clarifai.com/v2/models/general-image-recognition/outputs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: JSON.stringify({
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        inputs: [
          {
            data: {
              image: {
                base64: imageBase64,
              },
            },
          },
        ],
      }),
    });
  
    const result = await response.json();
    const concepts = result.outputs?.[0]?.data?.concepts || [];
    return concepts.map((c) => c.name);
  }
  