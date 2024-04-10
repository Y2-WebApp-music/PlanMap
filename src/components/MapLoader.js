export const loadGoogleMapsScript = async (callback) => {
    // AIzaSyDP0EreKWtxm9UVmjd9APR5RsKTqGs_JBE
    // const ApiKey = ""
    const ApiKey = "AIzaSyDP0EreKWtxm9UVmjd9APR5RsKTqGs_JBE"
    if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}&libraries=places`;
        script.async = true;
        script.onload = callback;
        document.body.appendChild(script);
        await new Promise(resolve => {
            script.onload = resolve;
        });
    } else {
        callback();
    }
};
