import { BsShare } from "react-icons/bs";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  EmailIcon,
  LinkedinIcon,
  FacebookIcon,
  FacebookShareButton,
  XIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

function ShareButton({
  propertyId,
  name,
}: {
  propertyId: string;
  name: string;
}) {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `${url}/properties/${propertyId}`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="p-2 cursor-pointer">
          <BsShare />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        sideOffset={8}
        className="flex items-center gap-x-2 justify-center w-full"
      >
        <div className="flex gap-x-2">
          <TwitterShareButton url={shareLink} title={name}>
            <XIcon size={32} round />
          </TwitterShareButton>

          <FacebookShareButton url={shareLink} title={name}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <WhatsappShareButton url={shareLink} title={name}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <LinkedinShareButton url={shareLink} title={name}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

          <EmailShareButton url={shareLink} title={name}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ShareButton;
