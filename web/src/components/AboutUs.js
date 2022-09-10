import React from "react";
import { Grid } from "@mui/material";
import MainLogo from "../svg/MainLogo";
export default function AboutUs() {
  return (
    <>
      <Grid item container justifyContent="center" className="create" xs={12}>
        <Grid
          item
          container
          justifyContent="center"
          xs={12}
          direction="row"
          style={{ marginTop: 20}}
        >
          <h1>מי אנחנו</h1>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          xs={12}
          direction="row"
          style={{ marginTop: 10}}
        >
          <MainLogo height={200} width={200} />
        </Grid>
        <Grid
          item
          container
          justifyContent="flex-start"
          xs={12}
          direction="row"
          style={{ marginTop: 20,marginBottom: 50, maxWidth: 800 , minWidth: 360, padding:30}}
        >
          <h3>
            חברת TradeMatch הוקמה במטרה לעזור לכם בהחזרת הערך הכספי הטמון בכל
            אותם המוצרים אשר נשכחו/נאגרו עם השנים בבית.
          </h3>
          <h3>
            {" "}
            אנו מציעים אפליקציה חינמית אשר מתאימה לכלל המכשירים הקיימים כיום
            מטלוויזיה ועד הסמארטפון.
          </h3>
          <h4>
            האפליקציה מונגשת בצורה נוחה וקלה לשימוש ומאפשרת לכל משתמש למצוא את
            ה"match" שלו. החברה שלנו מציעה פתרון לכל משתמש אשר מעוניין להחליף
            מוצר מכל תחום (לא בהכרח חדש) , בעד כל מוצר אחר שהוא מוכן להחליף
            בעדו. בעזרת האפלקצייה שלנו המשתמש יוכל לצלם את המוצר אשר הוא רוצה
            להחליף ולציין מה הוא מוכן לקבל בתמורה. שיטת "שגר ושכח", אנו נבצע את
            מיטב הבדיקות בשבילך ונמצא את התוצאה האולטימטיבית עבור ה"match" שלך,
            ברגע שתתבצע התאמה אשר עונה על הדרישות של המשתמש, המשתמש יקבל הודעת
            "match" עם הפרטים של המשתמש אשר עונה על הדרישות.
          </h4>
        </Grid>
      </Grid>
    </>
  );
}
