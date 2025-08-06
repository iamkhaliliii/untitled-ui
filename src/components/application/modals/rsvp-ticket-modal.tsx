import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "@untitledui/icons";

interface RSVPTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: {
        id: string;
        title: string;
        date: string;
        time: string;
        location: string;
        image: string;
        organizer: {
            name: string;
        };
    } | null;
}

export const RSVPTicketModal = ({ isOpen, onClose, event }: RSVPTicketModalProps) => {
    if (!event) return null;

    // Format date for ticket display
    const formatTicketDate = (dateStr: string) => {
        if (!dateStr) return 'Date TBD';
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return 'Date TBD';
            return date.toLocaleDateString('en-US', { 
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } catch (error) {
            return 'Date TBD';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{
                        background: 'linear-gradient(-45deg, #8067B7, #EC87C0)'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="ticket-widget"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Ticket Design */}
                        <div className="ticket-item">
                            <div className="ticket-item-right">
                                <h2 className="ticket-num">{new Date(event.date || Date.now()).getDate()}</h2>
                                <p className="ticket-day">{new Date(event.date || Date.now()).toLocaleDateString('en-US', { month: 'short' })}</p>
                                <span className="ticket-up-border"></span>
                                <span className="ticket-down-border"></span>
                            </div>
                            
                            <div className="ticket-item-left">
                                <div className="ticket-header">
                                    <p className="ticket-venue">LIVE CONCERT TICKET</p>
                                    <p className="ticket-event">{event.organizer?.name || 'Live Nation Entertainment'}</p>
                                </div>
                                <h2 className="ticket-title">{event.title || 'Summer Music Festival 2024'}</h2>
                                
                                <div className="ticket-sce">
                                    <div className="ticket-icon">
                                        <i className="fa fa-calendar"></i>
                                    </div>
                                    <p>{formatTicketDate(event.date)}<br/>{event.time || '8:00 PM - 11:30 PM'}</p>
                                </div>
                                <div className="ticket-fix"></div>
                                <div className="ticket-loc">
                                    <div className="ticket-icon">
                                        <i className="fa fa-map-marker"></i>
                                    </div>
                                    <p>{event.location || 'Madison Square Garden'}<br/>Section A, Row 12, Seat 15-16</p>
                                </div>
                                <div className="ticket-fix"></div>
                                <div className="ticket-sce">
                                    <div className="ticket-icon">
                                        <i className="fa fa-ticket"></i>
                                    </div>
                                    <p>Ticket #{String(event.id).padStart(6, '0')}<br/>General Admission • $75.00</p>
                                </div>
                                <div className="ticket-fix"></div>
                                <div className="ticket-loc">
                                    <div className="ticket-icon">
                                        <i className="fa fa-user"></i>
                                    </div>
                                    <p>Age Restriction: 18+<br/>Doors Open: 7:00 PM</p>
                                </div>
                                <div className="ticket-fix"></div>
                                <button 
                                    className="ticket-tickets"
                                    onClick={() => {
                                        console.log('RSVP confirmed for event:', event.id);
                                        onClose();
                                    }}
                                >
                                    CONFIRM RSVP
                                </button>
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            className="ticket-close"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <style dangerouslySetInnerHTML={{
                            __html: `
                            @import url('https://fonts.googleapis.com/css?family=Cabin|Indie+Flower|Inknut+Antiqua|Lora|Ravi+Prakash');
                            @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
                            
                            .ticket-widget {
                                width: 600px;
                                filter: drop-shadow(4px 12px 24px rgba(0, 0, 0, 0.3));
                                position: relative;
                                font-family: 'Cabin', sans-serif;
                                transform: rotate(-1deg);
                                transition: transform 0.4s ease;
                                background: transparent;
                                border-radius: 0;
                            }
                            
                            .ticket-widget:hover {
                                transform: rotate(0deg) scale(1.02);
                            }

                            .ticket-item {
                                display: flex;
                                background: #fff;
                                border-radius: 10px;
                                box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
                                overflow: hidden;
                                position: relative;
                            }

                            .ticket-item-right {
                                width: 160px;
                                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                position: relative;
                                color: #fff;
                            }

                            .ticket-num {
                                font-size: 60px;
                                font-weight: 300;
                                margin: 0;
                                font-family: 'Lora', serif;
                            }

                            .ticket-day {
                                font-size: 22px;
                                margin: 5px 0 0 0;
                                font-weight: 300;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                            }

                            .ticket-up-border, .ticket-down-border {
                                position: absolute;
                                right: -10px;
                                width: 20px;
                                height: 20px;
                                background: #8067B7;
                                border-radius: 50%;
                            }

                            .ticket-up-border {
                                top: -10px;
                            }

                            .ticket-down-border {
                                bottom: -10px;
                            }

                            .ticket-item-left {
                                flex: 1;
                                padding: 40px;
                                position: relative;
                            }

                            .ticket-header {
                                border-bottom: 2px dashed #e0e0e0;
                                padding-bottom: 15px;
                                margin-bottom: 20px;
                            }

                            .ticket-venue {
                                color: #999;
                                font-size: 12px;
                                margin: 0 0 5px 0;
                                text-transform: uppercase;
                                letter-spacing: 2px;
                                font-weight: 700;
                                font-family: 'Courier New', monospace;
                            }

                            .ticket-event {
                                color: #667eea;
                                font-size: 16px;
                                margin: 0;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                                font-weight: 600;
                            }

                            .ticket-title {
                                font-size: 34px;
                                margin: 0 0 25px 0;
                                font-weight: 300;
                                color: #333;
                                font-family: 'Lora', serif;
                                line-height: 1.2;
                            }

                            .ticket-sce, .ticket-loc {
                                display: flex;
                                align-items: flex-start;
                                margin-bottom: 20px;
                            }

                            .ticket-icon {
                                width: 36px;
                                height: 36px;
                                background: #f8f9fa;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                margin-right: 18px;
                                flex-shrink: 0;
                            }

                            .ticket-icon i {
                                color: #667eea;
                                font-size: 16px;
                            }

                            .ticket-sce p, .ticket-loc p {
                                margin: 0;
                                color: #666;
                                font-size: 16px;
                                line-height: 1.5;
                                font-weight: 500;
                            }

                            .ticket-fix {
                                clear: both;
                            }

                            .ticket-tickets {
                                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                color: #fff;
                                border: none;
                                padding: 15px 40px;
                                border-radius: 30px;
                                font-size: 16px;
                                font-weight: 600;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                                cursor: pointer;
                                transition: all 0.3s ease;
                                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                                margin-top: 25px;
                            }

                            .ticket-tickets:hover {
                                transform: translateY(-2px);
                                box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
                            }

                            .ticket-tickets:active {
                                transform: translateY(0);
                            }

                            .ticket-close {
                                position: absolute;
                                top: 12px;
                                right: 12px;
                                background: rgba(255, 255, 255, 0.9);
                                border: 1px solid rgba(0, 0, 0, 0.1);
                                border-radius: 50%;
                                width: 36px;
                                height: 36px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                cursor: pointer;
                                color: #6b7280;
                                transition: all 0.2s;
                                backdrop-filter: blur(4px);
                                z-index: 10;
                            }

                            .ticket-close:hover {
                                background: rgba(255, 255, 255, 1);
                                color: #374151;
                                transform: scale(1.1);
                                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                            }
                            `
                        }} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};