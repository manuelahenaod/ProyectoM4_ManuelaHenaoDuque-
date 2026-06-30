import { addDoc, collection, getDocs, query, where, doc, updateDoc, deleteDoc} from "firebase/firestore";
import { db } from "../../services/firebase";
import { type NewTask, type Task } from "../../types/task";


export async function createTask(task: NewTask) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), task);

    return docRef.id;
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    throw error;
  }
}


export async function getTasks(userId: string): Promise<Task[]> {
  try {
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    const tasks: Task[] = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
        id: doc.id,
        title: data.title,
        description: data.description,
        completed: data.completed,
        dueDate: data.dueDate.toDate(),
        createdAt: data.createdAt.toDate(),
        userId: data.userId,
    };
});

    return tasks;
  } catch (error) {
    console.error("Error obteniendo tareas:", error);
    throw error;
  }
}

export async function updateTask(
  id: string,
  updatedTask: Partial<Task>
) {
  try {
    const taskRef = doc(db, "tasks", id);

    await updateDoc(taskRef, updatedTask);

  } catch (error) {
    console.error("Error actualizando la tarea:", error);
    throw error;
  }
}

export async function deleteTask(id: string) {
  await deleteDoc(doc(db, "tasks", id));
}