// Fetch IP and location info from external API
async function fetchIPInfo() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching IP info:', error);
    return null;
  }
}

// Show IP info on page
async function showIPInfo() {
  const info = await fetchIPInfo();
  const ipInfoP = document.getElementById('ip-info');
  if (info) {
    ipInfoP.textContent = `IP: ${info.ip} | City: ${info.city} | Region: ${info.region} | Country: ${info.country_name} | Org: ${info.org}`;
    localStorage.setItem('ipInfo', JSON.stringify(info));
  } else {
    ipInfoP.textContent = 'Could not fetch IP info.';
  }
}

// Camera capture setup
async function startCamera() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const img = document.getElementById('captured-img');

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.style.display = 'block';

    // Capture a frame every 10 seconds
    setInterval(() => {
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const imgData = canvas.toDataURL('image/png');
      img.src = imgData;
      localStorage.setItem('cameraImage', imgData);
    }, 10000);
  } catch (error) {
    alert('Camera access denied or not available.');
  }
}

// Load previous data if exists
function loadPreviousData() {
  const ipInfo = localStorage.getItem('ipInfo');
  const cameraImage = localStorage.getItem('cameraImage');

  if (ipInfo) {
    document.getElementById('ip-info').textContent = JSON.parse(ipInfo).ip;
  }

  if (cameraImage) {
    document.getElementById('captured-img').src = cameraImage;
  }
}

// Event listeners
document.getElementById('start-camera').addEventListener('click', startCamera);

window.onload = () => {
  showIPInfo();
  loadPreviousData();
};
