import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import Component from '@reactions/component';
import { Table, Avatar, Heading } from 'evergreen-ui';
import Modal from '../components/dialog';

const JobsList = () => {
  const [Jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get('https://remoteok.io/api');
        setJobs(data.slice(1));
      } catch (ex) {}
    };
    fetchJobs();
  }, []);

  return (
    <>
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell placeholder="Search Position" />
          <Table.TextHeaderCell>Company</Table.TextHeaderCell>
          <Table.TextHeaderCell>Position</Table.TextHeaderCell>
          <Table.TextHeaderCell>Date</Table.TextHeaderCell>
        </Table.Head>
        <Table.VirtualBody height={600}>
          {Jobs.map((job) => (
            <Table.Row
              key={job.id}
              isSelectable
              onSelect={() => Modal(job)}
              height={60}
            >
              <Table.TextCell>
                <Avatar src={job.company_logo} name={job.company} size={40} />
              </Table.TextCell>
              <Table.TextCell>{job.company}</Table.TextCell>
              <Table.TextCell>{job.position}</Table.TextCell>
              <Table.TextCell>
                {moment(job.date).format('dddd, MMMM Do YYYY')}
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.VirtualBody>
      </Table>

      <Heading size={300} marginTop={38} textAlign="center">
        Powered by remoteok.io
      </Heading>
    </>
  );
};

export default JobsList;
