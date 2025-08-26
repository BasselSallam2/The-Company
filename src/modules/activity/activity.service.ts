
import {ActivityModel} from "./activity.schema.js";

interface LogParams { 
  action: "CREATE" | "UPDATE" | "DELETE";
  targetRef: string;
  target?: string;
  actor: string;
  actorRef: "User";
  data?: Record<string, any>;
}

 enum logActions {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}

 const logActivity = async ({action, targetRef, target, actor, actorRef}: LogParams) => {

    await ActivityModel.create({
        action,
        targetRef,
        target,
        actorRef,
        actor
    })
}

export {logActions , logActivity};


    


