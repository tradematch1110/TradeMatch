import React from 'react'
import { Grid } from '@mui/material';

export default function AboutUs() {
  return (
    <Grid
      direction={"column"}
      item
      container
      justifyContent="center"
      xs={12}
      className="aboutus"
    >
      <h1>
        חברת TradeMatch הוקמה במטרה לעזור לכם בהחזרת הערך הכספי הטמון בכל אותם
        המוצרים אשר נשכחו/נאגרו עם השנים בבית.
      </h1>
      <h1>
        {" "}
        אנו מציעים אפליקציה חינמית אשר מתאימה לכלל המכשירים הקיימים כיום
        מטלוויזיה ועד הסמארטפון.
      </h1>
      <h1>
        האפליקציה מונגשת בצורה נוחה וקלה לשימוש ומאפשרת לכל משתמש למצוא את
        ה"match" שלו. החברה שלנו מציעה פתרון לכל משתמש אשר מעוניין להחליף מוצר
        מכל תחום (לא בהכרח חדש) , בעד כל מוצר אחר שהוא מוכן להחליף בעדו. בעזרת
        האפלקצייה שלנו המשתמש יוכל לצלם את המוצר אשר הוא רוצה להחליף ולציין מה
        הוא מוכן לקבל בתמורה. שיטת "שגר ושכח", אנו נבצע את מיטב הבדיקות בשבילך
        ונמצא את התוצאה האולטימטיבית עבור ה"match" שלך, ברגע שתתבצע התאמה אשר
        עונה על הדרישות של המשתמש, המשתמש יקבל הודעת "match" עם הפרטים של המשתמש
        אשר עונה על הדרישות.
      </h1>
    </Grid>
  );
}
