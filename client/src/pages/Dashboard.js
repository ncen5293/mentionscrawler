import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Mentions from "./Mentions";
import Platforms from "./Platforms";
import Navbar from "./Navbar";
import { display } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  rightGridContainer: {
    backgroundColor: "#fafbff",
    height: "calc(100% - 92px)",
    borderLeft: "2px solid #e9eaee",
    width: "72%",
    marginLeft: "28%",
    marginTop: "92px"
  },
  leftGridContainer: {
    position: "fixed",
    height: "calc(100% - 92px)",
    width: "28%",
    marginTop: "92px"
  }
}));

function Dashboard() {
  const socket = window.io("", {
    autoConnect: false
  });

  const history = useHistory();
  const [platforms, setPlatforms] = useState({});
  const [mentions, setMentions] = useState([]);
  const [displayedMentions, setDisplay] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [sort, setSort] = useState(0);
  const [hasNextPage, setNextPage] = useState(true);
  const [pageNumber, setPage] = useState(0);
  useEffect(() => {
    if (!localStorage.getItem("email")) {
      handleLogout();
    } else {
      axios
        .get(`/settings/${localStorage.getItem("email")}/mentions`)
        .then(res => {
          if (res.data.authenticated === false) {
            handleLogout();
          } else if (res.data.success) {
            socket.connect();
            setPlatforms(res.data.settings.platforms);
            setCompanies(res.data.settings.companies);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
    return () => socket.disconnect();
  }, []);

  const handlePlatformToggle = platform => {
    console.log("toggled", platform);
    let newPlatforms = platforms;
    newPlatforms[platform] = !newPlatforms[platform];
    setDisplay(
      mentions.filter(mention => {
        return newPlatforms[mention.platform] === true;
      })
    );
    axios
      .put(`/settings/${localStorage.getItem("email")}/platform/${platform}`)
      .then(res => {
        if (res.data.authenticated === false) {
          handleLogout();
        } else if (res.data.success) {
          setPlatforms(res.data.settings.platforms);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSortChange = (event, sort) => {
    setSort(sort);
    let sortBy;
    if (sort === 0) {
      sortBy = "date";
    } else if (sort === 1) {
      sortBy = "popularity";
    } else {
      sortBy = "rating";
    }
    let companyNames = [];
    companies.forEach(company => companyNames.push(company.name));
    let platformNames = [];
    Object.keys(platforms).forEach(plt => {
      if (platforms[plt]) {
        platformNames.push(plt);
      }
    });
    axios
      .get("/search/pagination", {
        params: {
          companies: companyNames,
          platforms: platformNames,
          sortBy,
          page: 1
        }
      })
      .then(res => {
        setDisplay(res.data.mentions);
        setNextPage(res.data.hasNextPage);
        setPage(res.data.page);
      });
  };

  const loadMore = async (page) => {
    let sortBy;
    if (sort === 0) {
      sortBy = "date";
    } else if (sort === 1) {
      sortBy = "popularity";
    } else {
      sortBy = "rating";
    }
    let companyNames = [];
    companies.forEach(company => companyNames.push(company.name));
    let platformNames = [];
    Object.keys(platforms).forEach(plt => {
      if (platforms[plt]) {
        platformNames.push(plt);
      }
    });
    console.log('fetching more...')
    if (history.location.search.length > 0) {
      const query = queryString.parse(history.location.search);
      axios
        .get(`/search/pagination`, {
          params: {
            companies: query.companies.split(","),
            platforms: query.platforms.split(","),
            sortBy: "date",
            page: pageNumber+1,
            search: query.search
          }
        })
        .then(res => {
          setMentions(res.data.mentions);
          setDisplay(displayedMentions.concat(res.data.mentions));
          setNextPage(res.data.hasNextPage);
          setPage(res.data.page);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      axios
        .get("/search/pagination", {
          params: {
            companies: companyNames,
            platforms: platformNames,
            sortBy: "date",
            page: pageNumber+1
          }
        })
        .then(res => {
          setMentions(res.data.mentions);
          setDisplay(displayedMentions.concat(res.data.mentions));
          setNextPage(res.data.hasNextPage);
          setPage(res.data.page);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  const handleLogout = async () => {
    let response = await axios.post("/logout");
    if (response.data.success) {
      socket.disconnect();
      localStorage.clear();
      history.push("/login?redirect=dashboard");
    }
  };
  const classes = useStyles();
  return (
    <div>
      <Navbar platforms={platforms} companies={companies} />
      <Grid container spacing={0}>
        <Grid item className={classes.leftGridContainer}>
          <Platforms
            platforms={platforms}
            handleChange={handlePlatformToggle}
          />
        </Grid>
        <Grid item className={classes.rightGridContainer}>
          <Mentions
            mentions={displayedMentions}
            sort={sort}
            update={loadMore}
            hasMore={hasNextPage}
            handleChange={handleSortChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
