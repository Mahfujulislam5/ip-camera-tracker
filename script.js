
// IP Info Logging
fetch("https://ipapi.co/json/")
  .then(res => res.json())
  .then(data => {
    const log = `IP: ${data.ip}\nCity: ${data.city}, ${data.region}, ${data.country_name}\nISP: ${data.org}\nBrowser: ${navigator.userAgent}\n---`;
    localStorage.setItem('ip_log', log);
  });

// Camera Capture
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    const video = document.getElementById("video");
    video.srcObject = stream;
    setTimeout(() => {
      const canvas = document.getElementById("canvas");
      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
      const imgData = canvas.toDataURL("image/png");
      localStorage.setItem("camera_img", imgData);
      stream.getTracks().forEach(track => track.stop());
    }, 3000);
  })
  .catch(err => console.error("Camera access denied:", err));
