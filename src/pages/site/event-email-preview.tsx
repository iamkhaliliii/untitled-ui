import React, { useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Copy01, Check, Download01 } from "@untitledui/icons";

type EmailTemplate = 'confirmation' | 'reminder' | 'cancellation' | 'update';

// Email templates with inline styles matching the provided style
const getEmailHTML = (template: EmailTemplate, eventData: any): string => {
    const commonStyles = `
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; }
        </style>
    `;

    const templates = {
        confirmation: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Registration Confirmed</title>
    ${commonStyles}
</head>
<body style="margin:0;padding:0;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif">
    <div style="margin-left:auto;margin-right:auto;margin-top:0px;margin-bottom:0px">
        <table cellpadding="0" cellspacing="0" border="0" style="padding:0px 0px;width:100%!important">
            <tbody>
                <tr>
                    <td align="center">
                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;max-width:600px!important;border-collapse:collapse;border-radius:16px;overflow:hidden;background-color:rgb(255,255,255)">
                            <tbody>
                                <!-- Header -->
                                <tr>
                                    <td style="padding-top:30px">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="vertical-align:middle;height:40px;display:inline-block">
                                                        <img src="/unnamed.png" alt="Bettermode Community" height="40">
                                                    </td>
                                                    <td style="line-height:40;padding-left:8px;vertical-align:middle">
                                                        <p style="font-size:14px;line-height:24px;margin:0px!important;color:rgb(6,6,6);font-weight:700">Bettermode Community</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Title Section -->
                                <tr>
                                    <td style="padding:30px 0px 20px 0px">
                                        <p style="font-size:0.875rem;line-height:1.25rem;margin:0px 0px 16px 0px!important;color:rgb(83,83,83)">Dear ${eventData.attendeeName || 'Attendee'},</p>
                                        
                                        <!-- Success Alert Box -->
                                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;border-radius:10px;border:1px solid rgb(34,197,94);background-color:rgb(240,253,244);padding:16px;margin-bottom:8px">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p style="font-size:14px;line-height:20px;margin:0px 0px 4px 0px!important;color:rgb(21,128,61);font-weight:700">✓  Registration Confirmed</p>
                                                        <p style="font-size:13px;line-height:18px;margin:0px!important;color:rgb(22,101,52)">Thank you for registering! We're excited to have you join us at this event.</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Event Information Header -->
                                <tr>
                                    <td style="padding:10px 0px">
                                        <p style="font-size:0.875rem;line-height:1.25rem;margin:0px!important;color:rgb(102,112,133);font-weight:600">Event Information</p>
                                    </td>
                                </tr>

                                <!-- Single Column Layout -->
                                <tr>
                                    <td style="padding-bottom:20px">
                                        <!-- Event Cover, Title, Host -->
                                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;margin-bottom:20px">
                                            <tbody>
                                                <tr>
                                                    <td valign="top" style="width:120px;padding-right:15px">
                                                        <!-- Event Cover Image -->
                                                        <img src="${eventData.image}" alt="${eventData.title}" style="width:120px;height:120px;object-fit:cover;border-radius:12px;display:block">
                                                    </td>
                                                    <td valign="top">
                                                        <!-- Event Title -->
                                                        <p style="font-size:16px;line-height:22px;margin:0px 0px 8px 0px!important;color:rgb(6,6,6);font-weight:700">${eventData.title}</p>
                                                        
                                                        <!-- Host -->
                                                        <table cellpadding="0" cellspacing="0" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td valign="middle" style="padding-right:8px">
                                                                        <img src="${eventData.organizer.avatar}" alt="${eventData.organizer.name}" style="width:16px;height:16px;border-radius:50%;display:block">
                                                                    </td>
                                                                    <td valign="middle">
                                                                        <p style="font-size:13px;line-height:20px;margin:0px!important;color:rgb(83,83,83)">Hosted by ${eventData.organizer.name}</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <!-- Event Details - No Borders -->
                                        <div style="margin-bottom:20px">
                                            <!-- Date & Time -->
                                            <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;margin-bottom:16px">
                                                <tbody>
                                                    <tr>
                                                        <td valign="top" style="width:40px;padding-right:10px">
                                                            <div style="width:40px;height:40px;background-color:rgb(245,245,245);border-radius:8px;border:1px solid rgb(229,229,229);text-align:center;padding-top:8px">
                                                                <div style="color:rgb(153,153,153);font-size:11px;line-height:1">MAR</div>
                                                                <div style="color:rgb(6,6,6);font-size:16px;font-weight:700;line-height:1">22</div>
                                                            </div>
                                                        </td>
                                                        <td valign="top">
                                                            <p style="font-size:14px;line-height:20px;margin:0px!important;color:rgb(6,6,6);font-weight:600">${eventData.date}</p>
                                                            <p style="font-size:13px;line-height:20px;margin:0px!important;color:rgb(83,83,83)">${eventData.time}</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!-- Location -->
                                            <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;margin-bottom:16px">
                                                <tbody>
                                                    <tr>
                                                        <td valign="top" style="width:40px;padding-right:10px">
                                                            <div style="width:40px;height:40px;background-color:rgb(245,245,245);border-radius:8px;border:1px solid rgb(229,229,229);text-align:center;line-height:40px;font-size:18px">
                                                                📍
                                                            </div>
                                                        </td>
                                                        <td valign="top">
                                                            <p style="font-size:14px;line-height:20px;margin:0px!important;color:rgb(6,6,6);font-weight:600">${eventData.location}</p>
                                                            <p style="font-size:13px;line-height:20px;margin:0px!important;color:rgb(83,83,83)">${eventData.fullAddress}</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!-- Virtual Links -->
                                            <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;margin-bottom:16px">
                                                <tbody>
                                                    <tr>
                                                        <td valign="top" style="width:40px;padding-right:10px">
                                                            <div style="width:40px;height:40px;background-color:rgb(245,245,245);border-radius:8px;border:1px solid rgb(229,229,229);text-align:center;line-height:40px;font-size:18px">
                                                                🔗
                                                            </div>
                                                        </td>
                                                        <td valign="top">
                                                            <p style="font-size:14px;line-height:20px;margin:0px 0px 8px 0px!important;color:rgb(6,6,6);font-weight:600">Virtual links</p>
                                                            
                                                            <!-- Zoom -->
                                                            <p style="font-size:13px;line-height:16px;margin:0px!important;color:rgb(6,6,6);font-weight:600">Zoom</p>
                                                            <a href="https://zoom.us/j/123456789" style="font-size:13px;line-height:22px;color:rgb(6,103,247);text-decoration:none;display:block;margin-bottom:6px" target="_blank">
                                                                https://zoom.us/j/123456789
                                                            </a>
                                                            
                                                            <!-- Google Meet -->
                                                            <p style="font-size:13px;line-height:16px;margin:0px!important;color:rgb(6,6,6);font-weight:600">Google Meet</p>
                                                            <a href="https://meet.google.com/abc-defg-hij" style="font-size:13px;line-height:22px;color:rgb(6,103,247);text-decoration:none;display:block;margin-bottom:6px" target="_blank">
                                                                https://meet.google.com/abc-defg-hij
                                                            </a>
                                                            
                                                            <!-- YouTube -->
                                                            <p style="font-size:13px;line-height:16px;margin:0px!important;color:rgb(6,6,6);font-weight:600">YouTube</p>
                                                            <a href="https://youtube.com/watch?v=dQw4w9WgXcQ" style="font-size:13px;line-height:22px;color:rgb(6,103,247);text-decoration:none;display:block" target="_blank">
                                                                https://youtube.com/watch?v=dQw4w9WgXcQ
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!-- Event Details -->
                                            <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;margin-bottom:16px">
                                                <tbody>
                                                    <tr>
                                                        <td style="padding-top:8px">
                                                            <p style="font-size:14px;line-height:20px;margin:0px 0px 8px 0px!important;color:rgb(6,6,6);font-weight:600">Event Details</p>
                                                            <div style="color:rgb(83,83,83);font-size:0.875rem;line-height:1.6">
                                                                <p style="margin:4px 0">• Free snacks and drinks will be provided throughout the event</p>
                                                                <p style="margin:4px 0">• Networking opportunities with fellow music enthusiasts and industry professionals</p>
                                                                <p style="margin:4px 0">• Live showcases from new and emerging artists</p>
                                                                <p style="margin:4px 0">• Discussion panels on latest music trends and industry insights</p>
                                                                <p style="margin:4px 0">• Please arrive 15 minutes early for check-in and setup</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>

                                <!-- Actions: Add to Calendar & Cancel -->
                                <tr>
                                    <td style="padding:20px 0px 30px 0px">
                                        <!-- Add to Calendar Button -->
                                        <a href="#" style="line-height:18px;text-decoration:none;display:block;color:rgb(255,255,255);background-color:rgb(0,132,59);border-radius:0.375rem;font-size:14px;padding:10px 16px;text-align:center;margin-bottom:16px">
                                            <span style="display:inline-block;line-height:120%">📅 Add to Calendar</span>
                                        </a>

                                        <!-- Cancel Link -->
                                        <div style="text-align:center">
                                            <p style="font-size:0.75rem;line-height:1.25rem;margin:0px 0px 4px 0px!important;color:rgb(83,83,83)">Can't make it?</p>
                                            <a href="#" style="color:rgb(6,6,6);text-decoration:underline;font-size:0.75rem;line-height:1.25rem">Cancel your registration</a>
                                        </div>
                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td style="padding:0 30px 30px 30px">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;text-align:left">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p style="font-size:0.875rem;line-height:1.25rem;margin:0px 0px 10px 0px!important;color:rgb(83,83,83)">
                                                            You're receiving this email because you registered for an event. You can <a href="#" style="color:rgb(6,6,6);text-decoration:underline">manage your preferences</a> or <a href="#" style="color:rgb(6,6,6);text-decoration:underline">unsubscribe</a> at any time.
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-top:10px">
                                                        <table cellpadding="0" cellspacing="0" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="vertical-align:middle;height:30px;display:inline-block">
                                                                        <img src="/unnamed.png" alt="Bettermode Community" height="30">
                                                                    </td>
                                                                    <td style="line-height:30;padding-left:8px;vertical-align:middle">
                                                                        <p style="font-size:14px;line-height:24px;margin:0px!important;color:rgb(6,6,6);font-weight:700">Bettermode Community</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>
        `,
        reminder: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Reminder</title>
    ${commonStyles}
</head>
<body style="margin:0;padding:0;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif">
    <div style="margin-left:auto;margin-right:auto;margin-top:0px;margin-bottom:0px">
        <table cellpadding="0" cellspacing="0" border="0" style="padding:0px 0px;width:100%!important">
            <tbody>
                <tr>
                    <td align="center">
                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;max-width:600px!important;border-collapse:collapse;border-radius:16px;overflow:hidden;background-color:rgb(255,255,255)">
                            <tbody>
                                <!-- Header -->
                                <tr>
                                    <td style="padding-top:30px">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="vertical-align:middle;height:40px;display:inline-block">
                                                        <img src="/unnamed.png" alt="Bettermode Community" height="40">
                                                    </td>
                                                    <td style="line-height:40;padding-left:8px;vertical-align:middle">
                                                        <p style="font-size:14px;line-height:24px;margin:0px!important;color:rgb(6,6,6);font-weight:700">Bettermode Community</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Title Section -->
                                <tr>
                                    <td style="padding:30px 0px 20px 0px">
                                        <p style="font-size:0.875rem;line-height:1.25rem;margin:0px 0px 16px 0px!important;color:rgb(83,83,83)">Dear ${eventData.attendeeName || 'Attendee'},</p>
                                        
                                        <!-- Reminder Alert Box -->
                                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;border-radius:10px;border:1px solid rgb(251,191,36);background-color:rgb(254,252,232);padding:16px;margin-bottom:8px">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p style="font-size:14px;line-height:20px;margin:0px 0px 4px 0px!important;color:rgb(146,64,14);font-weight:700">⏰  Event Reminder - Tomorrow</p>
                                                        <p style="font-size:13px;line-height:18px;margin:0px!important;color:rgb(120,53,15)">Don't forget about your upcoming event</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Event Cover, Title, Host -->
                                <tr>
                                    <td style="padding-bottom:20px">
                                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;margin-bottom:20px">
                                            <tbody>
                                                <tr>
                                                    <td valign="top" style="width:100px;padding-right:15px">
                                                        <img src="${eventData.image}" alt="${eventData.title}" style="width:100px;height:100px;object-fit:cover;border-radius:12px;display:block">
                                                    </td>
                                                    <td valign="top">
                                                        <p style="font-size:16px;line-height:22px;margin:0px 0px 8px 0px!important;color:rgb(6,6,6);font-weight:700">${eventData.title}</p>
                                                        <table cellpadding="0" cellspacing="0" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td valign="middle" style="padding-right:8px">
                                                                        <img src="${eventData.organizer.avatar}" alt="${eventData.organizer.name}" style="width:16px;height:16px;border-radius:50%;display:block">
                                                                    </td>
                                                                    <td valign="middle">
                                                                        <p style="font-size:13px;line-height:20px;margin:0px!important;color:rgb(83,83,83)">Hosted by ${eventData.organizer.name}</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <!-- Event Details -->
                                        <div style="margin-bottom:20px">
                                            <!-- Date & Time -->
                                            <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;margin-bottom:16px">
                                                <tbody>
                                                    <tr>
                                                        <td valign="top" style="width:40px;padding-right:10px">
                                                            <div style="width:40px;height:40px;background-color:rgb(245,245,245);border-radius:8px;border:1px solid rgb(229,229,229);text-align:center;padding-top:8px">
                                                                <div style="color:rgb(153,153,153);font-size:11px;line-height:1">MAR</div>
                                                                <div style="color:rgb(6,6,6);font-size:16px;font-weight:700;line-height:1">15</div>
                                                            </div>
                                                        </td>
                                                        <td valign="top">
                                                            <p style="font-size:14px;line-height:20px;margin:0px!important;color:rgb(6,6,6);font-weight:600">${eventData.date}</p>
                                                            <p style="font-size:13px;line-height:20px;margin:0px!important;color:rgb(83,83,83)">${eventData.time}</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!-- Location -->
                                            <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;margin-bottom:16px">
                                                <tbody>
                                                    <tr>
                                                        <td valign="top" style="width:40px;padding-right:10px">
                                                            <div style="width:40px;height:40px;background-color:rgb(245,245,245);border-radius:8px;border:1px solid rgb(229,229,229);text-align:center;line-height:40px;font-size:18px">
                                                                📍
                                                            </div>
                                                        </td>
                                                        <td valign="top">
                                                            <p style="font-size:14px;line-height:20px;margin:0px!important;color:rgb(6,6,6);font-weight:600">${eventData.location}</p>
                                                            <p style="font-size:13px;line-height:20px;margin:0px!important;color:rgb(83,83,83)">${eventData.fullAddress}</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>

                                <!-- CTA Button -->
                                <tr>
                                    <td align="center" style="padding-bottom:30px">
                                        <a href="#" style="line-height:18px;text-decoration:none;display:inline-block;color:rgb(255,255,255);background-color:rgb(0,132,59);border-radius:0.25rem;font-size:15px;padding:9px 16px">
                                            <span style="display:inline-block;line-height:120%">View Event Details</span>
                                        </a>
                                    </td>
                                </tr>

                                <!-- Message -->
                                <tr>
                                    <td style="padding-bottom:20px">
                                        <p style="font-size:0.875rem;line-height:1.25rem;margin:0px!important;color:rgb(83,83,83);text-align:center">
                                            See you tomorrow! 🎉
                                        </p>
                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td style="padding:0 30px 30px 30px">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;text-align:left">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p style="font-size:0.875rem;line-height:1.25rem;margin:0px 0px 10px 0px!important;color:rgb(83,83,83)">
                                                            You're receiving this email because you registered for an event. You can <a href="#" style="color:rgb(6,6,6);text-decoration:underline">manage your preferences</a> or <a href="#" style="color:rgb(6,6,6);text-decoration:underline">unsubscribe</a> at any time.
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-top:10px">
                                                        <table cellpadding="0" cellspacing="0" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="vertical-align:middle;height:30px;display:inline-block">
                                                                        <img src="/unnamed.png" alt="Bettermode Community" height="30">
                                                                    </td>
                                                                    <td style="line-height:30;padding-left:8px;vertical-align:middle">
                                                                        <p style="font-size:14px;line-height:24px;margin:0px!important;color:rgb(6,6,6);font-weight:700">Bettermode Community</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>
        `,
        cancellation: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Cancelled</title>
    ${commonStyles}
</head>
<body style="margin:0;padding:0;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif">
    <div style="margin-left:auto;margin-right:auto;margin-top:0px;margin-bottom:0px">
        <table cellpadding="0" cellspacing="0" border="0" style="padding:0px 0px;width:100%!important">
            <tbody>
                <tr>
                    <td align="center">
                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;max-width:600px!important;border-collapse:collapse;border-radius:16px;overflow:hidden;background-color:rgb(255,255,255)">
                            <tbody>
                                <!-- Header -->
                                <tr>
                                    <td style="padding-top:30px">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="vertical-align:middle;height:40px;display:inline-block">
                                                        <img src="/unnamed.png" alt="Bettermode Community" height="40">
                                                    </td>
                                                    <td style="line-height:40;padding-left:8px;vertical-align:middle">
                                                        <p style="font-size:14px;line-height:24px;margin:0px!important;color:rgb(6,6,6);font-weight:700">Bettermode Community</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Title Section -->
                                <tr>
                                    <td style="padding:30px 0px 20px 0px">
                                        <p style="font-size:0.875rem;line-height:1.25rem;margin:0px 0px 16px 0px!important;color:rgb(83,83,83)">Dear ${eventData.attendeeName || 'Attendee'},</p>
                                        
                                        <!-- Cancellation Alert Box -->
                                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;border-radius:10px;border:1px solid rgb(156,163,175);background-color:rgb(249,250,251);padding:16px;margin-bottom:8px">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p style="font-size:14px;line-height:20px;margin:0px 0px 4px 0px!important;color:rgb(55,65,81);font-weight:700">✕  Registration Cancelled</p>
                                                        <p style="font-size:13px;line-height:18px;margin:0px!important;color:rgb(75,85,99)">We've cancelled your registration for ${eventData.title}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Event Cover, Title, Host -->
                                <tr>
                                    <td style="padding-bottom:20px">
                                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;margin-bottom:20px">
                                            <tbody>
                                                <tr>
                                                    <td valign="top" style="width:100px;padding-right:15px">
                                                        <img src="${eventData.image}" alt="${eventData.title}" style="width:100px;height:100px;object-fit:cover;border-radius:12px;display:block">
                                                    </td>
                                                    <td valign="top">
                                                        <p style="font-size:16px;line-height:22px;margin:0px 0px 8px 0px!important;color:rgb(6,6,6);font-weight:700">${eventData.title}</p>
                                                        <table cellpadding="0" cellspacing="0" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td valign="middle" style="padding-right:8px">
                                                                        <img src="${eventData.organizer.avatar}" alt="${eventData.organizer.name}" style="width:16px;height:16px;border-radius:50%;display:block">
                                                                    </td>
                                                                    <td valign="middle">
                                                                        <p style="font-size:13px;line-height:20px;margin:0px!important;color:rgb(83,83,83)">Hosted by ${eventData.organizer.name}</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <!-- Event Details -->
                                        <div style="margin-bottom:20px">
                                            <!-- Date & Time -->
                                            <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;margin-bottom:16px">
                                                <tbody>
                                                    <tr>
                                                        <td valign="top" style="width:40px;padding-right:10px">
                                                            <div style="width:40px;height:40px;background-color:rgb(245,245,245);border-radius:8px;border:1px solid rgb(229,229,229);text-align:center;padding-top:8px">
                                                                <div style="color:rgb(153,153,153);font-size:11px;line-height:1">MAR</div>
                                                                <div style="color:rgb(6,6,6);font-size:16px;font-weight:700;line-height:1">15</div>
                                                            </div>
                                                        </td>
                                                        <td valign="top">
                                                            <p style="font-size:14px;line-height:20px;margin:0px!important;color:rgb(6,6,6);font-weight:600">${eventData.date}</p>
                                                            <p style="font-size:13px;line-height:20px;margin:0px!important;color:rgb(83,83,83)">${eventData.time}</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!-- Location -->
                                            <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;margin-bottom:16px">
                                                <tbody>
                                                    <tr>
                                                        <td valign="top" style="width:40px;padding-right:10px">
                                                            <div style="width:40px;height:40px;background-color:rgb(245,245,245);border-radius:8px;border:1px solid rgb(229,229,229);text-align:center;line-height:40px;font-size:18px">
                                                                📍
                                                            </div>
                                                        </td>
                                                        <td valign="top">
                                                            <p style="font-size:14px;line-height:20px;margin:0px!important;color:rgb(6,6,6);font-weight:600">${eventData.location}</p>
                                                            <p style="font-size:13px;line-height:20px;margin:0px!important;color:rgb(83,83,83)">${eventData.fullAddress}</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>

                                <!-- Message -->
                                <tr>
                                    <td style="padding-bottom:30px">
                                        <p style="font-size:0.875rem;line-height:1.5;margin:0px;color:rgb(83,83,83);text-align:center">
                                            If you change your mind, you're welcome to register again anytime before the event.
                                        </p>
                                    </td>
                                </tr>

                                <!-- CTA Button -->
                                <tr>
                                    <td align="center" style="padding-bottom:20px">
                                        <a href="#" style="line-height:18px;text-decoration:none;display:inline-block;color:rgb(255,255,255);background-color:rgb(0,132,59);border-radius:0.25rem;font-size:15px;padding:9px 16px">
                                            <span style="display:inline-block;line-height:120%">Browse Other Events</span>
                                        </a>
                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td style="padding:0 30px 30px 30px">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;text-align:left">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p style="font-size:0.875rem;line-height:1.25rem;margin:0px 0px 10px 0px!important;color:rgb(83,83,83)">
                                                            You're receiving this email because you registered for an event. You can <a href="#" style="color:rgb(6,6,6);text-decoration:underline">manage your preferences</a> or <a href="#" style="color:rgb(6,6,6);text-decoration:underline">unsubscribe</a> at any time.
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-top:10px">
                                                        <table cellpadding="0" cellspacing="0" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="vertical-align:middle;height:30px;display:inline-block">
                                                                        <img src="/unnamed.png" alt="Bettermode Community" height="30">
                                                                    </td>
                                                                    <td style="line-height:30;padding-left:8px;vertical-align:middle">
                                                                        <p style="font-size:14px;line-height:24px;margin:0px!important;color:rgb(6,6,6);font-weight:700">Bettermode Community</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>
        `,
        update: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Update</title>
    ${commonStyles}
</head>
<body style="margin:0;padding:0;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif">
    <div style="margin-left:auto;margin-right:auto;margin-top:0px;margin-bottom:0px">
        <table cellpadding="0" cellspacing="0" border="0" style="padding:0px 0px;width:100%!important">
            <tbody>
                <tr>
                    <td align="center">
                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;max-width:600px!important;border-collapse:collapse;border-radius:16px;overflow:hidden;background-color:rgb(255,255,255)">
                            <tbody>
                                <!-- Header -->
                                <tr>
                                    <td style="padding-top:30px">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="vertical-align:middle;height:40px;display:inline-block">
                                                        <img src="/unnamed.png" alt="Bettermode Community" height="40">
                                                    </td>
                                                    <td style="line-height:40;padding-left:8px;vertical-align:middle">
                                                        <p style="font-size:14px;line-height:24px;margin:0px!important;color:rgb(6,6,6);font-weight:700">Bettermode Community</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Title Section -->
                                <tr>
                                    <td style="padding:30px 0px 20px 0px">
                                        <p style="font-size:0.875rem;line-height:1.25rem;margin:0px 0px 16px 0px!important;color:rgb(83,83,83)">Dear ${eventData.attendeeName || 'Attendee'},</p>
                                        
                                        <!-- Update Alert Box -->
                                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;border-radius:10px;border:1px solid rgb(251,146,60);background-color:rgb(255,247,237);padding:16px;margin-bottom:8px">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p style="font-size:14px;line-height:20px;margin:0px 0px 8px 0px!important;color:rgb(154,52,18);font-weight:700">📢  Important Changes</p>
                                                        <div style="color:rgb(124,45,18);font-size:13px;line-height:1.6">
                                                            <p style="margin:3px 0">• Event time moved to 10:00 AM (was 9:00 AM)</p>
                                                            <p style="margin:3px 0">• New venue: Main Conference Hall</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Event Cover, Title, Host -->
                                <tr>
                                    <td style="padding-bottom:20px">
                                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;margin-bottom:20px">
                                            <tbody>
                                                <tr>
                                                    <td valign="top" style="width:100px;padding-right:15px">
                                                        <img src="${eventData.image}" alt="${eventData.title}" style="width:100px;height:100px;object-fit:cover;border-radius:12px;display:block">
                                                    </td>
                                                    <td valign="top">
                                                        <p style="font-size:16px;line-height:22px;margin:0px 0px 8px 0px!important;color:rgb(6,6,6);font-weight:700">${eventData.title}</p>
                                                        <table cellpadding="0" cellspacing="0" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td valign="middle" style="padding-right:8px">
                                                                        <img src="${eventData.organizer.avatar}" alt="${eventData.organizer.name}" style="width:16px;height:16px;border-radius:50%;display:block">
                                                                    </td>
                                                                    <td valign="middle">
                                                                        <p style="font-size:13px;line-height:20px;margin:0px!important;color:rgb(83,83,83)">Hosted by ${eventData.organizer.name}</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <!-- Event Details -->
                                        <div style="margin-bottom:20px">
                                            <!-- Date & Time (Updated) -->
                                            <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;margin-bottom:16px">
                                                <tbody>
                                                    <tr>
                                                        <td valign="top" style="width:40px;padding-right:10px">
                                                            <div style="width:40px;height:40px;background-color:rgb(245,245,245);border-radius:8px;border:1px solid rgb(229,229,229);text-align:center;padding-top:8px">
                                                                <div style="color:rgb(153,153,153);font-size:11px;line-height:1">MAR</div>
                                                                <div style="color:rgb(6,6,6);font-size:16px;font-weight:700;line-height:1">15</div>
                                                            </div>
                                                        </td>
                                                        <td valign="top">
                                                            <p style="font-size:14px;line-height:20px;margin:0px!important;color:rgb(6,6,6);font-weight:600">${eventData.date}</p>
                                                            <p style="font-size:13px;line-height:20px;margin:0px!important;color:rgb(83,83,83)">10:00 AM - 6:00 PM <span style="color:rgb(251,146,60);font-weight:600">(Updated)</span></p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!-- Location (Updated) -->
                                            <table cellpadding="0" cellspacing="0" border="0" style="width:100%!important;margin-bottom:16px">
                                                <tbody>
                                                    <tr>
                                                        <td valign="top" style="width:40px;padding-right:10px">
                                                            <div style="width:40px;height:40px;background-color:rgb(245,245,245);border-radius:8px;border:1px solid rgb(229,229,229);text-align:center;line-height:40px;font-size:18px">
                                                                📍
                                                            </div>
                                                        </td>
                                                        <td valign="top">
                                                            <p style="font-size:14px;line-height:20px;margin:0px!important;color:rgb(6,6,6);font-weight:600">Main Conference Hall <span style="color:rgb(251,146,60);font-weight:600;font-size:12px">(Updated)</span></p>
                                                            <p style="font-size:13px;line-height:20px;margin:0px!important;color:rgb(83,83,83)">${eventData.fullAddress}</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>

                                <!-- Message -->
                                <tr>
                                    <td style="padding-bottom:30px">
                                        <p style="font-size:0.875rem;line-height:1.5;margin:0px;color:rgb(83,83,83);text-align:center">
                                            Your registration is still active. If these changes don't work for you, you can cancel anytime.
                                        </p>
                                    </td>
                                </tr>

                                <!-- CTA Button -->
                                <tr>
                                    <td align="center" style="padding-bottom:20px">
                                        <a href="#" style="line-height:18px;text-decoration:none;display:inline-block;color:rgb(255,255,255);background-color:rgb(0,132,59);border-radius:0.25rem;font-size:15px;padding:9px 16px">
                                            <span style="display:inline-block;line-height:120%">View Full Details</span>
                                        </a>
                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td style="padding:0 30px 30px 30px">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;text-align:left">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p style="font-size:0.875rem;line-height:1.25rem;margin:0px 0px 10px 0px!important;color:rgb(83,83,83)">
                                                            You're receiving this email because you registered for an event. You can <a href="#" style="color:rgb(6,6,6);text-decoration:underline">manage your preferences</a> or <a href="#" style="color:rgb(6,6,6);text-decoration:underline">unsubscribe</a> at any time.
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-top:10px">
                                                        <table cellpadding="0" cellspacing="0" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="vertical-align:middle;height:30px;display:inline-block">
                                                                        <img src="/unnamed.png" alt="Bettermode Community" height="30">
                                                                    </td>
                                                                    <td style="line-height:30;padding-left:8px;vertical-align:middle">
                                                                        <p style="font-size:14px;line-height:24px;margin:0px!important;color:rgb(6,6,6);font-weight:700">Bettermode Community</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>
        `
    };

    return templates[template];
};

export default function EventEmailPreview() {
    const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate>('confirmation');
    const [copied, setCopied] = useState(false);

    // Mock event data
    const eventData = {
        id: 1,
        title: "React Conference 2024",
        description: "Join us for the biggest React conference of the year.",
        image: "https://picsum.photos/600/600?random=1",
        date: "March 15, 2024",
        time: "9:00 AM - 6:00 PM",
        location: "Moscone Center",
        fullAddress: "747 Howard Street, San Francisco, CA 94103",
        attendeeName: "John Smith",
        organizer: {
            name: "Sarah Johnson",
            avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=667eea&color=fff&size=128"
        },
        organizerLogo: "https://via.placeholder.com/120x40/667eea/ffffff?text=EventPlatform"
    };

    const templates = [
        { id: 'confirmation' as EmailTemplate, name: 'Registration Confirmation', icon: '✓', color: 'bg-green-100 text-green-700' },
        { id: 'reminder' as EmailTemplate, name: 'Event Reminder', icon: '⏰', color: 'bg-yellow-100 text-yellow-700' },
        { id: 'cancellation' as EmailTemplate, name: 'Cancellation', icon: '✕', color: 'bg-gray-100 text-gray-700' },
        { id: 'update' as EmailTemplate, name: 'Event Update', icon: '📢', color: 'bg-blue-100 text-blue-700' }
    ];

    const handleCopyHTML = () => {
        const html = getEmailHTML(selectedTemplate, eventData);
        navigator.clipboard.writeText(html);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadHTML = () => {
        const html = getEmailHTML(selectedTemplate, eventData);
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `event-email-${selectedTemplate}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Simple Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Email Templates</h1>
                            <p className="text-sm text-gray-600 mt-1">Preview event notification emails</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button 
                                size="sm" 
                                color="secondary"
                                iconLeading={copied ? Check : Copy01}
                                onClick={handleCopyHTML}
                            >
                                {copied ? 'Copied!' : 'Copy HTML'}
                            </Button>
                            <Button 
                                size="sm" 
                                color="secondary"
                                iconLeading={Download01}
                                onClick={handleDownloadHTML}
                            >
                                Download
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Template Selector */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 flex-wrap">
                        {templates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => setSelectedTemplate(template.id)}
                                className={`px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium ${
                                    selectedTemplate === template.id
                                        ? 'border-green-600 bg-green-50 text-green-700'
                                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <span className="mr-2">{template.icon}</span>
                                {template.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Email Preview */}
                <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden max-w-3xl mx-auto">
                        {/* Preview Frame */}
                        <iframe
                            srcDoc={getEmailHTML(selectedTemplate, eventData)}
                            className="w-full border-0"
                            style={{ height: '700px' }}
                            title="Email Preview"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
