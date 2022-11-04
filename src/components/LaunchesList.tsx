import React, { useState, useEffect, ChangeEvent } from "react";
import LaunchesService from "../services/LaunchesService";
import ILaunchProps from "../types/Launches";

const LaunchesList: React.FC = () => {
  const [launches, setLaunches] = useState<Array<ILaunchProps>>([]);
  const [currentLaunch, setCurrentLaunch] = useState<ILaunchProps | null>(null);
  const [currentId, setCurrentId] = useState<number>(-1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    retrieveLaunches();
  }, []);

  const retrieveLaunches = () => {
    console.log(LaunchesService.getAllLaunches());
    LaunchesService.getAllLaunches()
      .then((response: any) => {
        setLaunches(response.data.docs);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const setActiveLaunch = (launch: ILaunchProps, id: number) => {
    setCurrentLaunch(launch);
    setCurrentId(id);
  };

  return (
    <div>
      <div>Sorting in porgress</div>
      <div>
        <h2>Launches list</h2>
        <ul>
          {launches &&
            launches.map((launch, id) => (
              <li
                key={id}
                onClick={() => setActiveLaunch(launch, id)}
                className={"list-item" + (id === currentId ? "active" : "")}
              >
                <div>
                  {launch.name}
                  <img src={launch.links.patch.small} alt="" />
                </div>
              </li>
            ))}
        </ul>
        <div>
          {currentLaunch ? (
            <div>
              <h3>Launch of {currentLaunch.name}</h3>
            </div>
          ) : (
            <div>Pending Launch</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaunchesList;
