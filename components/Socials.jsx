import Link from "next/link";
import codingSocials from "../data/coding-socials.json";
import miscSocials from "../data/misc-socials.json";

const Socials = () => {
  return (
    <div>
      <h2>Coding Socials</h2>
      <div>
        {codingSocials.map((social, index) => (
          <Link key={index} href={social.url} target="_blank">
            <div>
              <h2>{social.platform}</h2>
              <p>{social.icon}</p>
            </div>
          </Link>
        ))}
      </div>
      <h2>Miscellaneous Socials</h2>
      <div>
        {miscSocials.map((social, index) => (
          <Link key={index} href={social.url} target="_blank">
            <div>
              <h2>{social.platform}</h2>
              <p>{social.icon}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Socials;
