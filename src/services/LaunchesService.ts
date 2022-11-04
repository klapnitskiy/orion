import api from "../api";
import ILaunchProps from "../types/Launches";

const getAllLaunches = (pageParam: number = 3) => {
  return api.post<Array<ILaunchProps>>("/launches/query", {
    params: {
      query: {},
      options: {
        sort: {
          flight_number: "asc",
        },
        pagination: true,
        page: pageParam,
      },
    },
  });
};

const getLaunch = (id: string) => {
  return api.get<ILaunchProps>(`/launches/${id}`);
};

const LaunchesService = {
  getAllLaunches,
  getLaunch,
};

export default LaunchesService;
