
import ActivityModel from "./activity.model.js";

interface LogParams { 
  action: "CREATE" | "UPDATE" | "DELETE";
  targetRef: string;
  target?: string;
  actor: string;
  actorRef: "User";
  data?: Record<string, any>;
}

export enum logActions {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}

export const logActivity = async ({action, targetRef, target, actor, actorRef}: LogParams) => {

    await ActivityModel.create({
        action,
        targetRef,
        target,
        actorRef,
        actor
    })
}


    


