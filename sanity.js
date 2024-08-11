import sanityClient from "@sanity/client"
import  ImageUrlBuilder  from "@sanity/image-url";
const client = sanityClient({
    projectId: "5e3hm55i",
    dataset:"production",
    useCdn:true,
    apiVersion:"2021-10-21",
});

const builder = ImageUrlBuilder(client);

export const urlFor=(source)=>builder.image(source);


export default client;
