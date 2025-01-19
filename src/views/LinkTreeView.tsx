import { useEffect, useState } from "react"
import { social } from "../data/social"
import { DevTreeInput } from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeAPI";
import { SocialNetwork, User } from "../types";


export const LinkTreeView = () => {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(['user'])!;


  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: () => {
      toast.error('Error al cargar los links');
    },
    onSuccess: () => {
      toast.success('Actualizado correctamente');
      // queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  })

  useEffect(() => {
    const links = devTreeLinks.map((link: SocialNetwork) => {
      const social = user.links.find(social => social.name === link.name);

      if (social) {
        return { ...social, url: social.url, enable: social.enable, }
      }
      return link;
    })
    setDevTreeLinks(links);
  }, [])


  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link)
    setDevTreeLinks(updatedLinks);
  }

  const links: SocialNetwork[] = user.links;

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map(link => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          return { ...link, enable: !link.enable }
        } else {
          toast.error('URL no válida');
        }
      }
      return link;
    })
    setDevTreeLinks(updatedLinks);

    let updatedItems: SocialNetwork[] = [];

    const selectedSocialNetwork = updatedLinks.find(link => link.name === socialNetwork);
    if (selectedSocialNetwork?.enable) {

      const order = links.filter(link => link.order > 0).length + 1;
      if (links.some(links => links.name === socialNetwork)) {
        updatedItems = links.map(link => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              enable: true,
              order
            }
          } else {
            return link;
          }
        })
      } else {

        const newItems = {
          ...selectedSocialNetwork,
          order: links.length + 1
        }
        updatedItems = [...links, newItems];
      }
    } else {

      const indexToUpdate = links.findIndex(link => link.name === socialNetwork);
      updatedItems = links.map(link => {
        if (link.name === socialNetwork) {
          return {
            ...link,
            order: 0,
            enable: false,
          }
        } else if (link.order > indexToUpdate && (indexToUpdate != 0 && link.order === 1)) {
          return {
            ...link,
            order: link.order - 1
          }
        } else {
          return link;
        }
      })
    }


    //almacena en db
    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: updatedItems
      }
    })
  }




  return (
    <>
      <div className="space-y-5">
        {
          devTreeLinks.map(item => (
            <DevTreeInput key={item.name} item={item} handleUrlChange={handleUrlChange} handleEnableLink={handleEnableLink} />
          ))
        }
      </div>
      <button
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold"
        onClick={() => mutate(queryClient.getQueryData(['user'])!)}
      >Guardar cambios</button>
    </>
  )
}
