import { APP_INFO, COMPANY_INFO } from "@/app/_mock";
import { Section, Row, Column, Img, Text, Link, Html } from "@react-email/components";

// type Props = {
//   email: string,
//   fullName: string,
// }

export function PhotoboothMail({ fullName }) {
  const website = COMPANY_INFO.contact.website;
  return (
    <Html lang="en" dir="ltr">
      <Section>
        <Row>
          <Column colSpan={8}>
            <b style={{ textTransform: "capitalize" }}>Hello {fullName}</b> <p />
            <p>Please find the attached {APP_INFO.name} Memory </p>
            <p>{APP_INFO.email} </p>
            <p />
            <p>Best Regards</p>
          </Column>
        </Row>
        <Row>
          <Column colSpan={4}>
            <Img
              alt={`${COMPANY_INFO.name} Logo`}
              height="42"
              src={website + "images/logo/logo.png"}
            />
            <Text
              style={{
                marginTop: 8,
                marginBottom: 8,
                fontSize: 16,
                lineHeight: '24px',
                fontWeight: 600,
                color: 'rgb(17,24,39)',
              }}
            >
              {COMPANY_INFO.name}
            </Text>
            <Text
              style={{
                marginTop: 4,
                marginBottom: '0px',
                fontSize: 16,
                lineHeight: '24px',
                color: 'rgb(107,114,128)',
              }}
            >
              {COMPANY_INFO.tagline}
            </Text>
            <Text
              style={{
                marginTop: 4,
                marginBottom: '0px',
                fontSize: 16,
                lineHeight: '24px',
                color: 'rgb(107,114,128)',
              }}
            >
              {COMPANY_INFO.address.location} <br />
              {COMPANY_INFO.address.state} <br />
              {COMPANY_INFO.address.country}
            </Text>
          </Column>
        </Row>

        <table style={{ width: '100%' }}>
          <tr style={{ width: '100%' }}>
            <td align="center">
              <Row
                style={{
                  display: 'table-cell',
                  height: 44,
                  width: 56,
                  verticalAlign: 'bottom',
                }}
              >
                <Column style={{ paddingRight: 8 }}>
                  <Link href={COMPANY_INFO.socials[0].path}>
                    <Img
                      alt="Facebook"
                      src={website + "images/icons/facebook.png"}
                      height="24"
                      width="24"
                    />
                  </Link>
                </Column>
                <Column style={{ paddingRight: 8 }}>
                  <Link href={COMPANY_INFO.socials[4].path}>
                    <Img alt="youtube" 
                      src={website + "images/icons/youtube.png"}
                      height="24"
                      width="24"
                    />
                  </Link>
                </Column>
                <Column>
                  <Link href={COMPANY_INFO.socials[1].path}>
                    <Img
                      alt="Instagram"
                      src={website + "images/icons/instagram.png"}
                      height="24"
                      width="24"
                    />
                  </Link>
                </Column>
              </Row>
            </td>
          </tr>
        </table>
      </Section>
    </Html >
  );
};
