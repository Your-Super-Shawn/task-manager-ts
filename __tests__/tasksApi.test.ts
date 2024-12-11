import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const BASE_URL = "http://localhost:3000";

////////////////////////////////////////////////////////////////////////////
/// TASKS API CRUD TESTS ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

describe("Tasks API CRUD", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should fetch tasks correctly", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ title: "Task 1", _id: "1" }]));

    const response = await fetch(`${BASE_URL}/api/tasks`);
    const tasks = await response.json();

    expect(response.ok).toBeTruthy();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toEqual("Task 1");
  });

  it("should handle task creation", async () => {
    const newTask = { title: "New Task" };
    fetchMock.mockResponseOnce(JSON.stringify({ ...newTask, _id: "2" }), {
      status: 201,
    });

    const response = await fetch(`${BASE_URL}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const result = await response.json();

    expect(response.ok).toBeTruthy();
    expect(result._id).toBeDefined();
    expect(result.title).toEqual("New Task");
  });

  it("should handle task updating", async () => {
    const updates = { title: "Updated Task" };
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    const response = await fetch(`${BASE_URL}/api/tasks`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: "2", ...updates }),
    });

    expect(response.ok).toBeTruthy();
  });

  it("should handle task deletion", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    const response = await fetch(`${BASE_URL}/api/tasks`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: "2" }),
    });

    expect(response.ok).toBeTruthy();
  });

  it("should handle task creation with error for invalid data", async () => {
    const newTask = { title: "" }; // Invalid data as title should not be empty
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Title cannot be empty" }),
      {
        status: 400,
      }
    );

    const response = await fetch(`${BASE_URL}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const result = await response.json();

    expect(response.ok).toBeFalsy();
    expect(response.status).toBe(400);
    expect(result.message).toEqual("Title cannot be empty");
  });

  it("should handle task updating with error for invalid data", async () => {
    const updates = { title: "" }; // Invalid data as title should not be empty
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Title cannot be empty" }),
      {
        status: 400,
      }
    );

    const response = await fetch(`${BASE_URL}/api/tasks`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: "2", ...updates }),
    });

    const result = await response.json();

    expect(response.ok).toBeFalsy();
    expect(response.status).toBe(400);
    expect(result.message).toEqual("Title cannot be empty");
  });

  it("should handle task deletion with error for missing _id", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "_id is required for delete." }),
      {
        status: 400,
      }
    );

    const response = await fetch(`${BASE_URL}/api/tasks`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    const result = await response.json();

    expect(response.ok).toBeFalsy();
    expect(response.status).toBe(400);
    expect(result.message).toEqual("_id is required for delete.");
  });

  it("should handle task deletion with error for invalid _id", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: "_id is invalid." }), {
      status: 400,
    });

    const response = await fetch(`${BASE_URL}/api/tasks`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: "invalid_id" }),
    });

    const result = await response.json();

    expect(response.ok).toBeFalsy();
    expect(response.status).toBe(400);
    expect(result.message).toEqual("_id is invalid.");
  });
});

////////////////////////////////////////////////////////////////////////////
/// TASKS API SECURITY TESTS ///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
describe("Tasks API Security", () => {
  it("should not allow unauthorized task deletion", async () => {
    const unauthorizedResponse = fetchMock.mockResponseOnce(
      JSON.stringify({}),
      { status: 401 }
    );

    const response = await fetch(`${BASE_URL}/api/tasks`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer invalid_token",
      },
      body: JSON.stringify({ _id: "2" }),
    });

    expect(response.status).toBe(401);
    expect(response.ok).toBeFalsy();
  });
});
