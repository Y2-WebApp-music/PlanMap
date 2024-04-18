// export const loadGoogleMapsScript = async (callback) => {
//     // AIzaSyDP0EreKWtxm9UVmjd9APR5RsKTqGs_JBE
//     // const ApiKey = ""
//     const ApiKey = "AIzaSyDP0EreKWtxm9UVmjd9APR5RsKTqGs_JBE"
//     if (!window.google) {
//         const script = document.createElement('script');
//         script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}&libraries=places`;
//         script.async = true;
//         script.onload = callback;
//         document.body.appendChild(script);
//         await new Promise(resolve => {
//             script.onload = resolve;
//         });
//     } else {
//         callback();
//     }
// };


// export default function loadGoogleMapsScript( version = "weekly") {
//     const apiKey = "AIzaSyDP0EreKWtxm9UVmjd9APR5RsKTqGs_JBE"
//     return new Promise(async (resolve, reject) => {
//         let script = document.createElement("script");
//         script.onload = () => resolve(window.google.maps);
//         script.onerror = () => reject(new Error("Google Maps API failed to load"));
//         script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=${version}`;
//         document.head.appendChild(script);
//     });
// }

export default function loadGoogleMapsScript(version = "weekly", googleMapsParams = {}) {
    const apiKey = "AIzaSyDP0EreKWtxm9UVmjd9APR5RsKTqGs_JBE";
    return new Promise(async (resolve, reject) => {
        let script = document.createElement("script");
        let h, a, k, p = "The Google Maps JavaScript API",
            c = "google",
            l = "importLibrary",
            q = "__ib__",
            m = document,
            b = window;
        b = b[c] || (b[c] = {});
        var d = b.maps || (b.maps = {}),
            r = new Set,
            e = new URLSearchParams,
            u = () => h || (h = new Promise(async (f, n) => {
                await (a = m.createElement("script"));
                e.set("libraries", [...r] + "");
                for (k in googleMapsParams) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), googleMapsParams[k]);
                e.set("callback", c + ".maps." + q);
                a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
                d[q] = f;
                a.onerror = () => {
                    console.error("Failed to load Google Maps API script.");
                    h = n(Error(p + " could not load."));
                };
                a.nonce = m.querySelector("script[nonce]")?.nonce || "";
                m.head.append(a);
            }));
        d[l] ? console.warn(p + " only loads once. Ignoring:", googleMapsParams) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));

        script.onload = () => resolve(window.google.maps);
        script.onerror = () => reject(new Error("Google Maps API failed to load"));
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=${version}`;
        document.head.appendChild(script);
    });
}



// export const loadGoogleMapsScript = () => {
//     const apiKey = "AIzaSyDP0EreKWtxm9UVmjd9APR5RsKTqGs_JBE"; // Your Google Maps API key
//     const googleMapsParams = {
//         key: apiKey,
//         v: "weekly",
//       // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
//       // Add other bootstrap parameters as needed, using camel case.
//     };

//     var h, a, k, p = "The Google Maps JavaScript API",
//         c = "google",
//         l = "importLibrary",
//         q = "__ib__",
//         m = document,
//         b = window;
//     b = b[c] || (b[c] = {});
//     var d = b.maps || (b.maps = {}),
//         r = new Set,
//         e = new URLSearchParams,
//         u = () => h || (h = new Promise(async (f, n) => {
//         await(a = m.createElement("script"));
//         e.set("libraries", [...r] + "");
//         for (k in googleMapsParams) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), googleMapsParams[k]);
//         e.set("callback", c + ".maps." + q);
//         a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
//         d[q] = f;
//         a.onerror = () => {
//             console.error("Failed to load Google Maps API script.");
//             h = n(Error(p + " could not load."));
//         };
//         a.nonce = m.querySelector("script[nonce]")?.nonce || "";
//         m.head.append(a)
//     }));
//     d[l] ? console.warn(p + " only loads once. Ignoring:", googleMapsParams) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n))
// };


  // You can then import this function in another file like this:
  // import { googleMapsConfig } from './googleMapsConfig';
  // And use it like:
  // googleMapsConfig();
