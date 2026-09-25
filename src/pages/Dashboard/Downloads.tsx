import Section from "../../components/Section";
import NoInList from "../../components/Dashboard/NoInList";
import { useQuery } from "@tanstack/react-query";
import { getDownloads } from "../../../features/download/request";
import DownloadList from "../../components/Dashboard/Download/DownloadList";
import Loader from "../../components/Loader";

const Downloads = () => {
  const { data: downloads = [], isFetching } = useQuery({
    queryKey: ["getData"],
    queryFn: getDownloads,
  });

  return (
    <Section changePaddings="min-[1024px]:px-24">
      {isFetching ? (
        <Loader />
      ) : (
        <>
          {downloads.length === 0 ? (
            <NoInList link="/" message="No Download has been made yet." />
          ) : (
            <DownloadList downloads={downloads} />
          )}
        </>
      )}
    </Section>
  );
};

export default Downloads;
