export default interface ILaunchProps {
  id: string;
  name: string;
  date_local: string;
  details: string;
  links: {
    patch: {
      [small: string]: string;
    };
  };
}
