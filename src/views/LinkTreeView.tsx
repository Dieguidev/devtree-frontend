import { useState } from "react"
import { social } from "../data/social"


export const LinkTreeView = () => {
  const [devTreeLinks, setDevTreeLinks] = useState(social);
  return (
    <div>LinkTreeView</div>
  )
}
