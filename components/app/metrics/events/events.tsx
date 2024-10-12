import { motion } from "framer-motion";
import React from "react";

interface EventUsage {
  event: string;
  percentage: number;
  count: number; // Count of unique users who performed the event
}

const EventsCard = ({
  events,
  users,
}: {
  events: string[];
  users: string[];
}) => {
  const [eventUsage, setEventUsage] = React.useState<EventUsage[]>([]);

  React.useEffect(() => {
    const userEventCounts: { [key: string]: Set<string> } = {}; // Track unique users for each event

    events.forEach((event, index) => {
      const userId = users[index]; // Assuming users array corresponds to events array
      if (userId) {
        if (!userEventCounts[event]) {
          userEventCounts[event] = new Set();
        }
        userEventCounts[event].add(userId); // Add userId to the set for the event
      }
    });

    const totalUniqueUsers = new Set(users).size; // Total unique users
    const calculatedEventUsage = Object.entries(userEventCounts).map(
      ([event, userIds]) => ({
        event,
        count: userIds.size, // Count of unique users for the event
        percentage: Number(
          ((userIds.size / totalUniqueUsers) * 100).toFixed(1)
        ), // Calculate percentage
      })
    );

    // Sort by percentage in descending order
    const sortedEventUsage = calculatedEventUsage.sort(
      (a, b) => b.percentage - a.percentage
    );

    setEventUsage(sortedEventUsage);
  }, [events, users]);

  return (
    <div
      style={{
        border: "1px solid var(--outline)",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        alignItems: "start",
        width: "100%",
        justifyContent: "start",
        backgroundColor: "var(--on-dominant)",
        flexDirection: "column",
        gap: "0px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "space-between",
          width: "100%",
          maxHeight: "40px",
          justifyContent: "space-between",
        }}
      >
        <h4
          style={{
            color: "var(--secondary)",
            padding: "10px",
          }}
        >
          Events
        </h4>
        <p
          style={{
            color: "var(--subtitle)",
            padding: "10px",
          }}
        >
          Users & Percentage
        </p>
      </div>
      <div
        style={{
          height: "1px",
          width: "100%",
          borderBottom: "1px solid var(--outline)",
        }}
      ></div>
      <div
        style={{
          width: "100%",
        }}
      >
        {eventUsage.length === 0 ? (
          <div
            style={{
              color: "var(--subtitle)",
              padding: "10px",
              fontSize: "12px",
              textAlign: "center",
              width: "100%",
            }}
          >
            No data. Yet.
          </div>
        ) : (
          eventUsage.map((event) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: eventUsage.indexOf(event) * 0.1 }}
              key={event.event}
              style={{
                display: "flex",
                alignItems: "center",
                maxWidth: "100%",
                minWidth: "100%",
                background: `linear-gradient(to right, var(--dominant) ${event.percentage}%, transparent ${event.percentage}%)`,
                gap: "10px",
                marginBottom:
                  eventUsage.indexOf(event) === eventUsage.length - 1
                    ? "0"
                    : "4px",
                padding: "10px",
                borderRadius: "0px",
              }}
            >
              <p
                style={{
                  color: "var(--secondary)",
                }}
              >
                {event.event.charAt(0).toUpperCase() + event.event.slice(1)}
              </p>
              <p
                style={{
                  color: "var(--secondary)",
                  marginLeft: "auto",
                }}
              >
                {event.count} ({event.percentage}%){" "}
                {/* Display count and percentage */}
              </p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsCard;
